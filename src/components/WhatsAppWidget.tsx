import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // আপনার সোশ্যাল লিংকগুলো এখানে দিন
  const socialLinks = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: 'https://wa.me/+8801939574147',
      bgColor: 'bg-[#25D366]',
      hoverColor: 'hover:bg-[#128C7E]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      )
    },
    {
      id: 'messenger',
      name: 'Messenger',
      url: 'https://m.me/sayhamkayes', // আপনার Messenger ইউজারনেম দিন
      bgColor: 'bg-[#0084FF]',
      hoverColor: 'hover:bg-[#006bce]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
        </svg>
      )
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://ig.me/m/sayhamkayes', // আপনার Instagram ইউজারনেম দিন
      bgColor: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      hoverColor: 'hover:opacity-80',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex flex-col gap-3 origin-bottom-right"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`group flex items-center gap-3 rounded-full p-2 pr-5 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${link.bgColor} ${link.hoverColor}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                  {link.icon}
                </div>
                <span className="font-medium text-sm">Chat on {link.name}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <div className="relative h-14 w-14">
        {/* Open Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] focus:outline-none ${isOpen ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
          aria-label="Open Contact Options"
        >
          <MessageCircle className="h-7 w-7" />
        </button>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'}`}
          aria-label="Close Contact Options"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
