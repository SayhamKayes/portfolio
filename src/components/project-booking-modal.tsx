import { useState, useRef, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";
import { Loader2, Send, UploadCloud, Link as LinkIcon, Plus, X } from "lucide-react";
import { MagneticButton } from "./motion-primitives";
import { showPopup } from "./CustomPopup";
import { submitClientBooking } from "../server/admin";
import { uploadClientFile } from "../server/upload";

const inputClass = "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-cyan/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_var(--glow-color)]";
const labelClass = "mb-2 block text-xs uppercase tracking-widest text-muted-foreground";

export function ProjectBookingModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState("email");
  const [projectType, setProjectType] = useState("business_website");
  const [links, setLinks] = useState<string[]>([""]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      
      let fileUrls: string[] = [];

      if (selectedFiles && selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const reader = new FileReader();
          const base64Data = await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          const url = await uploadClientFile({
            data: {
              filename: file.name,
              contentType: file.type,
              base64Data
            }
          });
          if (url) fileUrls.push(url);
        }
      }

      const bookingData = {
        fullName: formData.get('fullName') as string,
        companyName: formData.get('companyName') as string || undefined,
        contactMethod,
        contactValue: formData.get('contactValue') as string,
        projectType,
        customProjectType: projectType === 'other' ? formData.get('customProjectType') as string : undefined,
        budget: formData.get('budget') as string,
        timeline: formData.get('timeline') as string,
        projectDetails: formData.get('projectDetails') as string,
        referenceLinks: links.filter(link => link.trim() !== ""),
        fileUrls
      };

      const result = await submitClientBooking({ data: bookingData });

      if (result?.success) {
        showPopup("Booking request submitted! We will contact you soon.", "success");
        setIsOpen(false);
        formElement.reset();
        setLinks([""]);
        setSelectedFiles([]);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      showPopup("Failed to submit booking. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
    // Reset input value so same file can be selected again if removed
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getContactPlaceholder = () => {
    switch (contactMethod) {
      case "whatsapp": return "+880 1XXXXXXXXX";
      case "messenger": return "username";
      case "instagram": return "@username";
      case "email": return "you@domain.com";
      default: return "Your contact info";
    }
  };

  const getContactLabel = () => {
    switch (contactMethod) {
      case "whatsapp": return "WhatsApp Number";
      case "messenger": return "Messenger Username";
      case "instagram": return "Instagram Handle";
      case "email": return "Email Address";
      default: return "Contact Info";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-strong border-white/10 p-0 sm:p-6">
        <DialogHeader className="px-6 pt-6 sm:p-0">
          <DialogTitle className="text-2xl font-bold">Start a Project</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Fill out the form below to give me a clear idea about your project. I'll get back to you shortly!
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={onSubmit} className="mt-2 space-y-6 px-6 pb-6 sm:p-0 sm:mt-6">
          {/* Personal Info */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
              <input name="fullName" required placeholder="John Doe" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Company Name <span className="text-red-500">*</span></label>
              <input name="companyName" required placeholder="Your Company" className={inputClass} />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Preferred Contact Method <span className="text-red-500">*</span></label>
              <select
                name="contactMethod"
                className={inputClass + " appearance-none cursor-pointer"}
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
              >
                <option className="bg-[#0a0a14] text-white" value="email">Email</option>
                <option className="bg-[#0a0a14] text-white" value="whatsapp">WhatsApp</option>
                <option className="bg-[#0a0a14] text-white" value="messenger">Messenger</option>
                <option className="bg-[#0a0a14] text-white" value="instagram">Instagram</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>{getContactLabel()} <span className="text-red-500">*</span></label>
              <input
                name="contactValue"
                required
                type={contactMethod === "email" ? "email" : "text"}
                placeholder={getContactPlaceholder()}
                className={inputClass}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Project Type</label>
              <select 
                name="projectType" 
                className={inputClass + " appearance-none cursor-pointer"}
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option className="bg-[#0a0a14] text-white" value="business_website">Business Website</option>
                <option className="bg-[#0a0a14] text-white" value="landing_page">Landing Page</option>
                <option className="bg-[#0a0a14] text-white" value="ecommerce_website">E-commerce Website</option>
                <option className="bg-[#0a0a14] text-white" value="full_stack_web_application">Full-Stack Web Application</option>
                <option className="bg-[#0a0a14] text-white" value="saas_application">SaaS Application</option>
                <option className="bg-[#0a0a14] text-white" value="management_system">Management System</option>
                <option className="bg-[#0a0a14] text-white" value="wordpress_website">WordPress Website</option>
                <option className="bg-[#0a0a14] text-white" value="ai_integration">AI Integration</option>
                <option className="bg-[#0a0a14] text-white" value="machine_learning">AI / Machine Learning</option>
                <option className="bg-[#0a0a14] text-white" value="mobile_app">Mobile Application</option>
                <option className="bg-[#0a0a14] text-white" value="maintenance">Maintenance / Bug Fixing</option>
                <option className="bg-[#0a0a14] text-white" value="other">Other</option>
              </select>
              
              {projectType === "other" && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                  <input 
                    name="customProjectType" 
                    placeholder="Specify Project Type" 
                    required 
                    className={inputClass} 
                  />
                </div>
              )}
            </div>
            <div>
              <label className={labelClass}>Estimated Budget</label>
              <select name="budget" className={inputClass + " appearance-none cursor-pointer"}>
                <option className="bg-[#0a0a14] text-white" value="less than 500">less than $500</option>
                <option className="bg-[#0a0a14] text-white" value="500-1000">$500 - $1000</option>
                <option className="bg-[#0a0a14] text-white" value="1000-3000">$1000 - $3000</option>
                <option className="bg-[#0a0a14] text-white" value="3000+">$3000+</option>
                <option className="bg-[#0a0a14] text-white" value="undecided">Not Sure</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Timeline</label>
              <select name="timeline" className={inputClass + " appearance-none cursor-pointer"}>
                <option className="bg-[#0a0a14] text-white" value="1-2_weeks">1 Weeks</option>
                <option className="bg-[#0a0a14] text-white" value="1-2_weeks">2 Weeks</option>
                <option className="bg-[#0a0a14] text-white" value="1-2_weeks">3 Weeks</option>
                <option className="bg-[#0a0a14] text-white" value="1_month">1 Month</option>
                <option className="bg-[#0a0a14] text-white" value="1_month">2 Month</option>
                <option className="bg-[#0a0a14] text-white" value="1_month">3 Month</option>
                <option className="bg-[#0a0a14] text-white" value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Project Details <span className="text-red-500">*</span></label>
            <textarea
              required
              name="projectDetails"
              rows={4}
              placeholder="Tell me about your vision, goals, and requirements..."
              className={inputClass + " resize-none"}
            />
          </div>

          {/* References & Files */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Reference Links (Optional)</label>
              <div className="space-y-3">
                {links.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={link}
                        onChange={(e) => {
                          const newLinks = [...links];
                          newLinks[index] = e.target.value;
                          setLinks(newLinks);
                        }}
                        className={inputClass + " pl-10"}
                      />
                    </div>
                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setLinks(links.filter((_, i) => i !== index))}
                        className="p-3 rounded-2xl glass-strong text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setLinks([...links, ""])}
                  className="flex items-center gap-2 text-xs font-medium text-cyan hover:text-cyan/80 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add another link
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Upload Files (Images/Zip - Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-2xl hover:border-cyan/50 transition-colors bg-white/[0.02]">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="flex flex-col sm:flex-row text-sm text-muted-foreground justify-center items-center gap-1">
                    <label className="relative cursor-pointer rounded-md font-medium text-cyan hover:text-cyan/80 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        multiple 
                        accept=".zip,.jpg,.jpeg,.png,.pdf" 
                        onChange={handleFileChange}
                      />
                    </label>
                    <p>or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground/70">
                    PNG, JPG, PDF, ZIP up to 10MB
                  </p>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.05] border border-white/10">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {file.type.startsWith('image/') ? (
                          <div className="h-8 w-8 rounded bg-white/10 overflow-hidden shrink-0">
                            <img src={URL.createObjectURL(file)} alt="preview" className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center shrink-0">
                            <span className="text-xs font-semibold uppercase">{file.name.split('.').pop()}</span>
                          </div>
                        )}
                        <span className="text-sm truncate max-w-[150px] sm:max-w-[300px]">{file.name}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeFile(idx)}
                        className="text-muted-foreground hover:text-red-400 p-1 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <MagneticButton
              className={`w-full sm:w-auto ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
              onClick={() => {
                if (!isSubmitting) {
                  formRef.current?.requestSubmit();
                }
              }}
            >
              {isSubmitting ? (
                <div className="flex w-full items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                </div>
              ) : (
                <div className="flex w-full items-center justify-center gap-2">
                  Submit Request <Send className="h-4 w-4" />
                </div>
              )}
            </MagneticButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
