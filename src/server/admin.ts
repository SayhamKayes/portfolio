import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { deleteImageFromStorage } from "./upload";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const SITE_OWNER_EMAIL =
  process.env.SITE_OWNER_EMAIL || process.env.GMAIL_USER || "sayhamkayes@gmail.com";

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.siteSetting.findMany();
  } catch (e) {
    console.error("Database connection failed", e);
    return [
      {
        key: "primaryColor",
        value: "#3b82f6",
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
});

export const updateSiteSetting = createServerFn({ method: "POST" })
  .validator((d: { key: string; value: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.siteSetting.upsert({
        where: { key: data.key },
        update: { value: data.value },
        create: { key: data.key, value: data.value },
      });
    } catch (e) {
      console.error("Database connection failed", e);
      return null;
    }
  });

export const incrementProfileViews = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: "profileViews" } });
    const currentViews = setting ? parseInt(setting.value) || 0 : 0;
    return await prisma.siteSetting.upsert({
      where: { key: "profileViews" },
      update: { value: (currentViews + 1).toString() },
      create: { key: "profileViews", value: "1" },
    });
  } catch (e) {
    console.error("Failed to increment profile views", e);
    return null;
  }
});

export const getSiteSettingBackups = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.siteSettingBackup.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    return [];
  }
});

export const createSiteSettingBackup = createServerFn({ method: "POST" })
  .validator((d: { key: string; value: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.siteSettingBackup.create({ data });
    } catch (e) {
      return null;
    }
  });

export const deleteSiteSettingBackup = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.siteSettingBackup.delete({ where: { id: data.id } });
    } catch (e) {
      return null;
    }
  });

// PORTFOLIO
export const getPortfolioItems = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.portfolioItem.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    return [];
  }
});
export const getDeletedPortfolioItems = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.portfolioItem.findMany({
      where: { isDeleted: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    return [];
  }
});
export const addPortfolioItem = createServerFn({ method: "POST" })
  .validator(
    (d: {
      title: string;
      description: string;
      imageUrl?: string;
      link?: string;
      githubLink?: string;
      technologies: string;
      category?: string;
    }) => d,
  )
  .handler(async ({ data }) => {
    try {
      return await prisma.portfolioItem.create({ data });
    } catch (e) {
      return null;
    }
  });
export const editPortfolioItem = createServerFn({ method: "POST" })
  .validator(
    (d: {
      id: string;
      title: string;
      description: string;
      imageUrl?: string;
      link?: string;
      githubLink?: string;
      technologies: string;
      category?: string;
    }) => d,
  )
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      return await prisma.portfolioItem.update({ where: { id }, data: updateData });
    } catch (e) {
      return null;
    }
  });
export const deletePortfolioItem = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.portfolioItem.update({
        where: { id: data.id },
        data: { isDeleted: true },
      });
    } catch (e) {
      return null;
    }
  });
export const restorePortfolioItem = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.portfolioItem.update({
        where: { id: data.id },
        data: { isDeleted: false },
      });
    } catch (e) {
      return null;
    }
  });
export const permanentlyDeletePortfolioItem = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      const item = await prisma.portfolioItem.findUnique({ where: { id: data.id } });
      const deletedItem = await prisma.portfolioItem.delete({ where: { id: data.id } });

      if (item?.imageUrl) {
        await deleteImageFromStorage(item.imageUrl);
      }

      return deletedItem;
    } catch (e) {
      return null;
    }
  });

// SKILLS
export const getSkills = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.skill.findMany({ where: { isDeleted: false }, orderBy: { name: "asc" } });
  } catch (e) {
    return [];
  }
});
export const getDeletedSkills = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.skill.findMany({ where: { isDeleted: true }, orderBy: { name: "asc" } });
  } catch (e) {
    return [];
  }
});
export const addSkill = createServerFn({ method: "POST" })
  .validator((d: { name: string; category?: string; level?: number; icon?: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.skill.create({ data });
    } catch (e) {
      return null;
    }
  });
export const editSkill = createServerFn({ method: "POST" })
  .validator(
    (d: { id: string; name: string; category?: string; level?: number; icon?: string }) => d,
  )
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      return await prisma.skill.update({ where: { id }, data: updateData });
    } catch (e) {
      return null;
    }
  });
export const deleteSkill = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.skill.update({ where: { id: data.id }, data: { isDeleted: true } });
    } catch (e) {
      return null;
    }
  });
export const restoreSkill = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.skill.update({ where: { id: data.id }, data: { isDeleted: false } });
    } catch (e) {
      return null;
    }
  });
export const permanentlyDeleteSkill = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      const item = await prisma.skill.findUnique({ where: { id: data.id } });
      const deletedItem = await prisma.skill.delete({ where: { id: data.id } });

      if (item?.icon) {
        await deleteImageFromStorage(item.icon);
      }

      return deletedItem;
    } catch (e) {
      return null;
    }
  });

// TESTIMONIALS
export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.testimonial.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    return [];
  }
});
export const getDeletedTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.testimonial.findMany({
      where: { isDeleted: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    return [];
  }
});
export const addTestimonial = createServerFn({ method: "POST" })
  .validator(
    (d: {
      name: string;
      designation: string;
      content?: string | null;
      avatarUrl?: string;
      screenshotUrl?: string;
    }) => d,
  )
  .handler(async ({ data }) => {
    try {
      return await prisma.testimonial.create({ data });
    } catch (e) {
      return null;
    }
  });
export const editTestimonial = createServerFn({ method: "POST" })
  .validator(
    (d: {
      id: string;
      name: string;
      designation: string;
      content?: string | null;
      avatarUrl?: string;
      screenshotUrl?: string;
    }) => d,
  )
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      return await prisma.testimonial.update({ where: { id }, data: updateData });
    } catch (e) {
      return null;
    }
  });
export const deleteTestimonial = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.testimonial.update({ where: { id: data.id }, data: { isDeleted: true } });
    } catch (e) {
      return null;
    }
  });
export const restoreTestimonial = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.testimonial.update({
        where: { id: data.id },
        data: { isDeleted: false },
      });
    } catch (e) {
      return null;
    }
  });
export const permanentlyDeleteTestimonial = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      const item = await prisma.testimonial.findUnique({ where: { id: data.id } });
      const deletedItem = await prisma.testimonial.delete({ where: { id: data.id } });

      if (item?.avatarUrl) {
        await deleteImageFromStorage(item.avatarUrl);
      }
      if (item?.screenshotUrl) {
        await deleteImageFromStorage(item.screenshotUrl);
      }

      return deletedItem;
    } catch (e) {
      return null;
    }
  });

// GLOBAL CLIENTS
export const getGlobalClients = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.globalClient.findMany({
      where: { isDeleted: false },
      orderBy: { country: "asc" },
    });
  } catch (e) {
    return [];
  }
});
export const getDeletedGlobalClients = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.globalClient.findMany({
      where: { isDeleted: true },
      orderBy: { country: "asc" },
    });
  } catch (e) {
    return [];
  }
});
export const addGlobalClient = createServerFn({ method: "POST" })
  .validator((d: { country: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.globalClient.create({ data });
    } catch (e) {
      return null;
    }
  });
export const editGlobalClient = createServerFn({ method: "POST" })
  .validator((d: { id: string; country: string }) => d)
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      return await prisma.globalClient.update({ where: { id }, data: updateData });
    } catch (e) {
      return null;
    }
  });
export const deleteGlobalClient = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.globalClient.update({
        where: { id: data.id },
        data: { isDeleted: true },
      });
    } catch (e) {
      return null;
    }
  });
export const restoreGlobalClient = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.globalClient.update({
        where: { id: data.id },
        data: { isDeleted: false },
      });
    } catch (e) {
      return null;
    }
  });
export const permanentlyDeleteGlobalClient = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.globalClient.delete({ where: { id: data.id } });
    } catch (e) {
      return null;
    }
  });

// EXPERIENCES
export const getExperiences = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.experience.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "asc" },
    });
  } catch (e) {
    return [];
  }
});
export const getDeletedExperiences = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.experience.findMany({
      where: { isDeleted: true },
      orderBy: { createdAt: "asc" },
    });
  } catch (e) {
    return [];
  }
});
export const addExperience = createServerFn({ method: "POST" })
  .validator((d: { title: string; company: string; duration: string; description: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.experience.create({ data });
    } catch (e) {
      return null;
    }
  });
export const editExperience = createServerFn({ method: "POST" })
  .validator(
    (d: { id: string; title: string; company: string; duration: string; description: string }) => d,
  )
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      return await prisma.experience.update({ where: { id }, data: updateData });
    } catch (e) {
      return null;
    }
  });
export const deleteExperience = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.experience.update({ where: { id: data.id }, data: { isDeleted: true } });
    } catch (e) {
      return null;
    }
  });
export const restoreExperience = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.experience.update({ where: { id: data.id }, data: { isDeleted: false } });
    } catch (e) {
      return null;
    }
  });
export const permanentlyDeleteExperience = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.experience.delete({ where: { id: data.id } });
    } catch (e) {
      return null;
    }
  });

// EDUCATIONS
export const getEducations = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.education.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "asc" },
    });
  } catch (e) {
    return [];
  }
});
export const getDeletedEducations = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.education.findMany({
      where: { isDeleted: true },
      orderBy: { createdAt: "asc" },
    });
  } catch (e) {
    return [];
  }
});
export const addEducation = createServerFn({ method: "POST" })
  .validator(
    (d: { degree: string; institution: string; duration: string; description?: string }) => d,
  )
  .handler(async ({ data }) => {
    try {
      return await prisma.education.create({ data });
    } catch (e) {
      return null;
    }
  });
export const editEducation = createServerFn({ method: "POST" })
  .validator(
    (d: {
      id: string;
      degree: string;
      institution: string;
      duration: string;
      description?: string;
    }) => d,
  )
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      return await prisma.education.update({ where: { id }, data: updateData });
    } catch (e) {
      return null;
    }
  });
export const deleteEducation = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.education.update({ where: { id: data.id }, data: { isDeleted: true } });
    } catch (e) {
      return null;
    }
  });
export const restoreEducation = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.education.update({ where: { id: data.id }, data: { isDeleted: false } });
    } catch (e) {
      return null;
    }
  });
export const permanentlyDeleteEducation = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.education.delete({ where: { id: data.id } });
    } catch (e) {
      return null;
    }
  });

// MESSAGES
export const submitMessage = createServerFn({ method: "POST" })
  .validator((d: { name: string; email: string; subject?: string; message: string }) => d)
  .handler(async ({ data }) => {
    try {
      const existingIgnored = await prisma.message.findFirst({
        where: { email: data.email, isIgnored: true },
      });

      const existingThread = await prisma.message.findFirst({
        where: { email: data.email },
        orderBy: { createdAt: "desc" },
      });

      const newMessage = {
        sender: "client",
        message: data.message,
        subject: data.subject,
        timestamp: new Date().toISOString(),
      };

      if (existingThread) {
        const currentThread = Array.isArray(existingThread.thread) ? existingThread.thread : [];
        await prisma.message.update({
          where: { id: existingThread.id },
          data: {
            thread: [...currentThread, newMessage],
            isRead: false,
            isIgnored: !!existingIgnored,
            updatedAt: new Date(),
          },
        });
      } else {
        await prisma.message.create({
          data: {
            ...data,
            isIgnored: !!existingIgnored,
            thread: [newMessage],
          },
        });
      }

      if (!existingIgnored && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        // Notify owner (Admin Notification)
        // Kept 100% plain text and removed replyTo spoofing to avoid spam flags.
        await transporter
          .sendMail({
            to: SITE_OWNER_EMAIL,
            subject: `New Message from ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject || "N/A"}\n\nMessage:\n${data.message}`,
          })
          .catch((err) => console.error("Failed to send notification email:", err));

        // Auto-reply to user
        // 100% plain text, no HTML, no custom 'From' name. This mimics a human email.
        await transporter
          .sendMail({
            to: data.email,
            subject: "Thank you for reaching out",
            text: `Hi ${data.name},\n\nI have received your message and will get back to you shortly.\n\nBest regards,\nSayham Kayes`,
          })
          .catch((err) => console.error("Failed to send auto-reply:", err));
      }

      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  });
export const getMessages = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    return [];
  }
});
export const markMessageRead = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.message.update({ where: { id: data.id }, data: { isRead: true } });
    } catch (e) {
      return null;
    }
  });

export const toggleMessageRead = createServerFn({ method: "POST" })
  .validator((d: { id: string; isRead: boolean }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.message.update({ where: { id: data.id }, data: { isRead: data.isRead } });
    } catch (e) {
      return null;
    }
  });

export const toggleMessageReplied = createServerFn({ method: "POST" })
  .validator((d: { id: string; isReplied: boolean }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.message.update({
        where: { id: data.id },
        data: { isReplied: data.isReplied },
      });
    } catch (e) {
      return null;
    }
  });

export const toggleMessageIgnored = createServerFn({ method: "POST" })
  .validator((d: { id: string; isIgnored: boolean }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.message.update({
        where: { id: data.id },
        data: { isIgnored: data.isIgnored },
      });
    } catch (e) {
      return null;
    }
  });
export const replyToMessage = createServerFn({ method: "POST" })
  .validator((d: { id: string; replyContent: string }) => d)
  .handler(async ({ data }) => {
    try {
      const msg = await prisma.message.findUnique({ where: { id: data.id } });
      if (msg) {
        const currentThread = Array.isArray(msg.thread) ? msg.thread : [];
        const replyMessage = {
          sender: "admin",
          content: data.replyContent,
          timestamp: new Date().toISOString(),
        };

        if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
          await transporter
            .sendMail({
              to: msg.email,
              subject: `Re: ${msg.subject || "Your message"}`,
              text: `${data.replyContent}\n\n---\nSayham Kayes\nFull Stack & AI/ML Developer`,
            })
            .catch((err) => console.error("Failed to send reply:", err));
        }
        await prisma.message.update({
          where: { id: data.id },
          data: {
            isRead: true,
            isReplied: true,
            thread: [...currentThread, replyMessage],
          },
        });

        return { success: true };
      }
      return { success: false };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  });
export const deleteMessage = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.message.delete({ where: { id: data.id } });
    } catch (e) {
      return null;
    }
  });

// DASHBOARD STATS
export const getDashboardStats = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const totalProjects = await prisma.portfolioItem.count({ where: { isDeleted: false } });
    const totalSkills = await prisma.skill.count({ where: { isDeleted: false } });
    const totalMessages = await prisma.message.count({ where: { sender: { not: "admin" } } });
    const unreadMessages = await prisma.message.count({
      where: { isRead: false, sender: { not: "admin" } },
    });
    const profileViewsSetting = await prisma.siteSetting.findUnique({
      where: { key: "profileViews" },
    });
    const profileViews = profileViewsSetting ? parseInt(profileViewsSetting.value) : 0;
    const totalGlobalClients = await prisma.globalClient.count({ where: { isDeleted: false } });
    const totalClientBookings = await prisma.clientBooking.count();
    const unreadClientBookings = await prisma.clientBooking.count({ where: { isRead: false } });

    return {
      totalProjects,
      totalSkills,
      totalMessages,
      unreadMessages,
      profileViews,
      totalGlobalClients,
      totalClientBookings,
      unreadClientBookings,
    };
  } catch (e) {
    return {
      totalProjects: 0,
      totalSkills: 0,
      totalMessages: 0,
      unreadMessages: 0,
      profileViews: 0,
      totalGlobalClients: 0,
      totalClientBookings: 0,
      unreadClientBookings: 0,
    };
  }
});

// CLIENT BOOKINGS
export const submitClientBooking = createServerFn({ method: "POST" })
  .validator(
    z.object({
      fullName: z.string(),
      companyName: z.string().optional(),
      contactMethod: z.string(),
      contactValue: z.string(),
      projectType: z.string(),
      customProjectType: z.string().optional(),
      budget: z.string(),
      timeline: z.string(),
      projectDetails: z.string(),
      referenceLinks: z.array(z.string()),
      fileUrls: z.array(z.string()),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const existingIgnored = await prisma.clientBooking.findFirst({
        where: { contactValue: data.contactValue, isIgnored: true },
      });

      const existingThread = await prisma.clientBooking.findFirst({
        where: {
          contactValue: data.contactValue,
          projectType: data.projectType,
        },
        orderBy: { createdAt: "desc" },
      });

      const newMessage = {
        sender: "client",
        projectDetails: data.projectDetails,
        referenceLinks: data.referenceLinks,
        fileUrls: data.fileUrls,
        timestamp: new Date().toISOString(),
      };

      if (existingThread) {
        const currentThread = Array.isArray(existingThread.thread) ? existingThread.thread : [];
        await prisma.clientBooking.update({
          where: { id: existingThread.id },
          data: {
            thread: [...currentThread, newMessage],
            isRead: false,
            isIgnored: !!existingIgnored,
            updatedAt: new Date(),
          },
        });
      } else {
        await prisma.clientBooking.create({
          data: {
            ...data,
            isIgnored: !!existingIgnored,
            thread: [newMessage],
          },
        });
      }

      if (!existingIgnored && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        const linksText =
          data.referenceLinks.filter(Boolean).length > 0
            ? `\nReference Links:\n${data.referenceLinks.filter(Boolean).join("\n")}`
            : "";

        const filesText =
          data.fileUrls.filter(Boolean).length > 0
            ? `\nUploaded Files:\n${data.fileUrls.filter(Boolean).join("\n")}`
            : "";

        const actualProjectType =
          data.projectType === "other" ? data.customProjectType : data.projectType;

        const emailText = `New Project Booking from ${data.fullName}
        
Company: ${data.companyName || "N/A"}
Contact Method: ${data.contactMethod} (${data.contactValue})
Project Type: ${actualProjectType}
Budget: ${data.budget}
Timeline: ${data.timeline}

Details:
${data.projectDetails}
${linksText}${filesText}`;

        // Notify owner
        await transporter
          .sendMail({
            to: SITE_OWNER_EMAIL,
            subject: `New Project Booking Request from ${data.fullName}`,
            text: emailText,
          })
          .catch((err) => console.error("Failed to send notification email:", err));

        // Auto-reply to user if email was selected
        if (data.contactMethod === "email") {
          await transporter
            .sendMail({
              to: data.contactValue,
              subject: "Project Booking Received",
              text: `Hi ${data.fullName},\n\nI have received your project booking request and will get back to you shortly.\n\nBest regards,\nSayham Kayes`,
            })
            .catch((err) => console.error("Failed to send auto-reply:", err));
        }
      }

      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  });

export const getClientBookings = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await prisma.clientBooking.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    return [];
  }
});

export const markClientBookingRead = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.clientBooking.update({ where: { id: data.id }, data: { isRead: true } });
    } catch (e) {
      return null;
    }
  });

export const toggleClientBookingRead = createServerFn({ method: "POST" })
  .validator((d: { id: string; isRead: boolean }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.clientBooking.update({
        where: { id: data.id },
        data: { isRead: data.isRead },
      });
    } catch (e) {
      return null;
    }
  });

export const toggleClientBookingReplied = createServerFn({ method: "POST" })
  .validator((d: { id: string; isReplied: boolean }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.clientBooking.update({
        where: { id: data.id },
        data: { isReplied: data.isReplied },
      });
    } catch (e) {
      return null;
    }
  });

export const toggleClientBookingIgnored = createServerFn({ method: "POST" })
  .validator((d: { id: string; isIgnored: boolean }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.clientBooking.update({
        where: { id: data.id },
        data: { isIgnored: data.isIgnored },
      });
    } catch (e) {
      return null;
    }
  });

export const replyToClientBooking = createServerFn({ method: "POST" })
  .validator((d: { id: string; replyContent: string }) => d)
  .handler(async ({ data }) => {
    try {
      const booking = await prisma.clientBooking.findUnique({ where: { id: data.id } });

      if (booking) {
        const currentThread = Array.isArray(booking.thread) ? booking.thread : [];
        const replyMessage = {
          sender: "admin",
          content: data.replyContent,
          timestamp: new Date().toISOString(),
        };

        if (booking.contactMethod === "email" && booking.contactValue) {
          if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
            await transporter
              .sendMail({
                to: booking.contactValue,
                subject: `Re: Your Project Booking Request`,
                text: `${data.replyContent}\n\n---\nSayham Kayes\nFull Stack Developer`,
              })
              .catch((err) => console.error("Failed to send reply:", err));
          }
        }

        await prisma.clientBooking.update({
          where: { id: data.id },
          data: {
            isRead: true,
            isReplied: true,
            thread: [...currentThread, replyMessage],
          },
        });
        return { success: true };
      }
      return { success: false };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  });

export const deleteClientBooking = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.clientBooking.delete({ where: { id: data.id } });
    } catch (e) {
      return null;
    }
  });
