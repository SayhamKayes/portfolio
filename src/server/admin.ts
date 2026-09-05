import { createServerFn } from '@tanstack/react-start';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import { deleteImageFromStorage } from './upload';

export const getSiteSettings = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    return await prisma.siteSetting.findMany();
  } catch (e) {
    console.error('Database connection failed', e);
    return [{ key: 'primaryColor', value: '#3b82f6', id: '1', createdAt: new Date(), updatedAt: new Date() }];
  }
});

export const updateSiteSetting = createServerFn({ method: 'POST' })
  .validator((d: { key: string; value: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.siteSetting.upsert({
        where: { key: data.key },
        update: { value: data.value },
        create: { key: data.key, value: data.value },
      });
    } catch (e) {
      console.error('Database connection failed', e);
      return null;
    }
  });

export const getSiteSettingBackups = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.siteSettingBackup.findMany({ orderBy: { createdAt: 'desc' } }); } catch (e) { return []; }
});

export const createSiteSettingBackup = createServerFn({ method: 'POST' })
  .validator((d: { key: string; value: string }) => d)
  .handler(async ({ data }) => {
    try {
      return await prisma.siteSettingBackup.create({ data });
    } catch (e) { return null; }
  });

export const deleteSiteSettingBackup = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.siteSettingBackup.delete({ where: { id: data.id } }); } catch (e) { return null; }
  });

// PORTFOLIO
export const getPortfolioItems = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.portfolioItem.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } }); } catch (e) { return []; }
});
export const getDeletedPortfolioItems = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.portfolioItem.findMany({ where: { isDeleted: true }, orderBy: { createdAt: 'desc' } }); } catch (e) { return []; }
});
export const addPortfolioItem = createServerFn({ method: 'POST' })
  .validator((d: { title: string; description: string; imageUrl?: string; link?: string; githubLink?: string; technologies: string; category?: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.portfolioItem.create({ data }); } catch (e) { return null; }
  });
export const editPortfolioItem = createServerFn({ method: 'POST' })
  .validator((d: { id: string; title: string; description: string; imageUrl?: string; link?: string; githubLink?: string; technologies: string; category?: string }) => d)
  .handler(async ({ data }) => {
    try { const { id, ...updateData } = data; return await prisma.portfolioItem.update({ where: { id }, data: updateData }); } catch (e) { return null; }
  });
export const deletePortfolioItem = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.portfolioItem.update({ where: { id: data.id }, data: { isDeleted: true } }); } catch (e) { return null; }
  });
export const restorePortfolioItem = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.portfolioItem.update({ where: { id: data.id }, data: { isDeleted: false } }); } catch (e) { return null; }
  });
export const permanentlyDeletePortfolioItem = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      const item = await prisma.portfolioItem.findUnique({ where: { id: data.id } });
      const deletedItem = await prisma.portfolioItem.delete({ where: { id: data.id } });

      if (item?.imageUrl) {
        await deleteImageFromStorage(item.imageUrl);
      }

      return deletedItem;
    } catch (e) { return null; }
  });

// SKILLS
export const getSkills = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.skill.findMany({ where: { isDeleted: false }, orderBy: { name: 'asc' } }); } catch (e) { return []; }
});
export const getDeletedSkills = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.skill.findMany({ where: { isDeleted: true }, orderBy: { name: 'asc' } }); } catch (e) { return []; }
});
export const addSkill = createServerFn({ method: 'POST' })
  .validator((d: { name: string; category?: string; level?: number; icon?: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.skill.create({ data }); } catch (e) { return null; }
  });
export const editSkill = createServerFn({ method: 'POST' })
  .validator((d: { id: string; name: string; category?: string; level?: number; icon?: string }) => d)
  .handler(async ({ data }) => {
    try { const { id, ...updateData } = data; return await prisma.skill.update({ where: { id }, data: updateData }); } catch (e) { return null; }
  });
export const deleteSkill = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.skill.update({ where: { id: data.id }, data: { isDeleted: true } }); } catch (e) { return null; }
  });
export const restoreSkill = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.skill.update({ where: { id: data.id }, data: { isDeleted: false } }); } catch (e) { return null; }
  });
export const permanentlyDeleteSkill = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      const item = await prisma.skill.findUnique({ where: { id: data.id } });
      const deletedItem = await prisma.skill.delete({ where: { id: data.id } });

      if (item?.icon) {
        await deleteImageFromStorage(item.icon);
      }

      return deletedItem;
    } catch (e) { return null; }
  });

// TESTIMONIALS
export const getTestimonials = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.testimonial.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } }); } catch (e) { return []; }
});
export const getDeletedTestimonials = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.testimonial.findMany({ where: { isDeleted: true }, orderBy: { createdAt: 'desc' } }); } catch (e) { return []; }
});
export const addTestimonial = createServerFn({ method: 'POST' })
  .validator((d: { name: string; designation: string; content?: string | null; avatarUrl?: string; screenshotUrl?: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.testimonial.create({ data }); } catch (e) { return null; }
  });
export const editTestimonial = createServerFn({ method: 'POST' })
  .validator((d: { id: string; name: string; designation: string; content?: string | null; avatarUrl?: string; screenshotUrl?: string }) => d)
  .handler(async ({ data }) => {
    try { const { id, ...updateData } = data; return await prisma.testimonial.update({ where: { id }, data: updateData }); } catch (e) { return null; }
  });
export const deleteTestimonial = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.testimonial.update({ where: { id: data.id }, data: { isDeleted: true } }); } catch (e) { return null; }
  });
export const restoreTestimonial = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.testimonial.update({ where: { id: data.id }, data: { isDeleted: false } }); } catch (e) { return null; }
  });
export const permanentlyDeleteTestimonial = createServerFn({ method: 'POST' })
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
    } catch (e) { return null; }
  });

// GLOBAL CLIENTS
export const getGlobalClients = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.globalClient.findMany({ where: { isDeleted: false }, orderBy: { country: 'asc' } }); } catch (e) { return []; }
});
export const getDeletedGlobalClients = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.globalClient.findMany({ where: { isDeleted: true }, orderBy: { country: 'asc' } }); } catch (e) { return []; }
});
export const addGlobalClient = createServerFn({ method: 'POST' })
  .validator((d: { country: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.globalClient.create({ data }); } catch (e) { return null; }
  });
export const editGlobalClient = createServerFn({ method: 'POST' })
  .validator((d: { id: string; country: string }) => d)
  .handler(async ({ data }) => {
    try { const { id, ...updateData } = data; return await prisma.globalClient.update({ where: { id }, data: updateData }); } catch (e) { return null; }
  });
export const deleteGlobalClient = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.globalClient.update({ where: { id: data.id }, data: { isDeleted: true } }); } catch (e) { return null; }
  });
export const restoreGlobalClient = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.globalClient.update({ where: { id: data.id }, data: { isDeleted: false } }); } catch (e) { return null; }
  });
export const permanentlyDeleteGlobalClient = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.globalClient.delete({ where: { id: data.id } }); } catch (e) { return null; }
  });

// EXPERIENCES
export const getExperiences = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.experience.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'asc' } }); } catch (e) { return []; }
});
export const getDeletedExperiences = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.experience.findMany({ where: { isDeleted: true }, orderBy: { createdAt: 'asc' } }); } catch (e) { return []; }
});
export const addExperience = createServerFn({ method: 'POST' })
  .validator((d: { title: string; company: string; duration: string; description: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.experience.create({ data }); } catch (e) { return null; }
  });
export const editExperience = createServerFn({ method: 'POST' })
  .validator((d: { id: string; title: string; company: string; duration: string; description: string }) => d)
  .handler(async ({ data }) => {
    try { const { id, ...updateData } = data; return await prisma.experience.update({ where: { id }, data: updateData }); } catch (e) { return null; }
  });
export const deleteExperience = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.experience.update({ where: { id: data.id }, data: { isDeleted: true } }); } catch (e) { return null; }
  });
export const restoreExperience = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.experience.update({ where: { id: data.id }, data: { isDeleted: false } }); } catch (e) { return null; }
  });
export const permanentlyDeleteExperience = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.experience.delete({ where: { id: data.id } }); } catch (e) { return null; }
  });

// EDUCATIONS
export const getEducations = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.education.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'asc' } }); } catch (e) { return []; }
});
export const getDeletedEducations = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.education.findMany({ where: { isDeleted: true }, orderBy: { createdAt: 'asc' } }); } catch (e) { return []; }
});
export const addEducation = createServerFn({ method: 'POST' })
  .validator((d: { degree: string; institution: string; duration: string; description?: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.education.create({ data }); } catch (e) { return null; }
  });
export const editEducation = createServerFn({ method: 'POST' })
  .validator((d: { id: string; degree: string; institution: string; duration: string; description?: string }) => d)
  .handler(async ({ data }) => {
    try { const { id, ...updateData } = data; return await prisma.education.update({ where: { id }, data: updateData }); } catch (e) { return null; }
  });
export const deleteEducation = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.education.update({ where: { id: data.id }, data: { isDeleted: true } }); } catch (e) { return null; }
  });
export const restoreEducation = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.education.update({ where: { id: data.id }, data: { isDeleted: false } }); } catch (e) { return null; }
  });
export const permanentlyDeleteEducation = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.education.delete({ where: { id: data.id } }); } catch (e) { return null; }
  });

// MESSAGES
export const submitMessage = createServerFn({ method: 'POST' })
  .validator((d: { name: string; email: string; subject?: string; message: string }) => d)
  .handler(async ({ data }) => {
    try {
      const msg = await prisma.message.create({ data });
      console.log(`New message from ${data.name} <${data.email}>: ${data.message}`);
      return msg;
    } catch (e) { return null; }
  });
export const getMessages = createServerFn({ method: 'GET' }).handler(async () => {
  try { return await prisma.message.findMany({ orderBy: { createdAt: 'desc' } }); } catch (e) { return []; }
});
export const markMessageRead = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.message.update({ where: { id: data.id }, data: { isRead: true } }); } catch (e) { return null; }
  });
export const replyToMessage = createServerFn({ method: 'POST' })
  .validator((d: { id: string; replyContent: string }) => d)
  .handler(async ({ data }) => {
    try {
      const msg = await prisma.message.findUnique({ where: { id: data.id } });
      if (msg) {
        console.log(`Simulated Email Reply to ${msg.email}:\n${data.replyContent}`);
        return await prisma.message.update({ where: { id: data.id }, data: { isRead: true } });
      }
      return null;
    } catch (e) { return null; }
  });
export const deleteMessage = createServerFn({ method: 'POST' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try { return await prisma.message.delete({ where: { id: data.id } }); } catch (e) { return null; }
  });

// DASHBOARD STATS
export const getDashboardStats = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const totalProjects = await prisma.portfolioItem.count({ where: { isDeleted: false } });
    const totalSkills = await prisma.skill.count({ where: { isDeleted: false } });
    const totalMessages = await prisma.message.count();
    const unreadMessages = await prisma.message.count({ where: { isRead: false } });
    const profileViewsSetting = await prisma.siteSetting.findUnique({ where: { key: 'profileViews' } });
    const profileViews = profileViewsSetting ? parseInt(profileViewsSetting.value) : 0;
    const totalGlobalClients = await prisma.globalClient.count({ where: { isDeleted: false } });
    
    return { totalProjects, totalSkills, totalMessages, unreadMessages, profileViews, totalGlobalClients };
  } catch (e) {
    return { totalProjects: 0, totalSkills: 0, totalMessages: 0, unreadMessages: 0, profileViews: 0, totalGlobalClients: 0 };
  }
});
