import { c as createServerRpc } from "./createServerRpc-DLZfK7kq.mjs";
import { c as createServerFn } from "./server-CqYADRQX.mjs";
import { p as prisma } from "./prisma-CNVbm53E.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "@prisma/client";
const getSiteSettings_createServerFn_handler = createServerRpc({
  id: "549c4bb353b5b66b8188dab04dadb26a316e0d6145079218f2ca9fa4d5a4bc6b",
  name: "getSiteSettings",
  filename: "src/server/admin.ts"
}, (opts) => getSiteSettings.__executeServer(opts));
const getSiteSettings = createServerFn({
  method: "GET"
}).handler(getSiteSettings_createServerFn_handler, async () => {
  try {
    return await prisma.siteSetting.findMany();
  } catch (e) {
    console.error("Database connection failed", e);
    return [{
      key: "primaryColor",
      value: "#3b82f6",
      id: "1",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }];
  }
});
const updateSiteSetting_createServerFn_handler = createServerRpc({
  id: "78b40f753a9accf507568304c6bd9af3db1846d794f72a41394b6ce5f9ab46ee",
  name: "updateSiteSetting",
  filename: "src/server/admin.ts"
}, (opts) => updateSiteSetting.__executeServer(opts));
const updateSiteSetting = createServerFn({
  method: "POST"
}).validator((d) => d).handler(updateSiteSetting_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.siteSetting.upsert({
      where: {
        key: data.key
      },
      update: {
        value: data.value
      },
      create: {
        key: data.key,
        value: data.value
      }
    });
  } catch (e) {
    console.error("Database connection failed", e);
    return null;
  }
});
const getSiteSettingBackups_createServerFn_handler = createServerRpc({
  id: "ef2fd8e472ebd08444d99d463f2599b814aeacad57fe0aa4d11b098d1fa69bbf",
  name: "getSiteSettingBackups",
  filename: "src/server/admin.ts"
}, (opts) => getSiteSettingBackups.__executeServer(opts));
const getSiteSettingBackups = createServerFn({
  method: "GET"
}).handler(getSiteSettingBackups_createServerFn_handler, async () => {
  try {
    return await prisma.siteSettingBackup.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch (e) {
    return [];
  }
});
const createSiteSettingBackup_createServerFn_handler = createServerRpc({
  id: "c80f1b2d6791c1d80b457d48ee38d546e514a48f5e06931957e4d50c6831a7e1",
  name: "createSiteSettingBackup",
  filename: "src/server/admin.ts"
}, (opts) => createSiteSettingBackup.__executeServer(opts));
const createSiteSettingBackup = createServerFn({
  method: "POST"
}).validator((d) => d).handler(createSiteSettingBackup_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.siteSettingBackup.create({
      data
    });
  } catch (e) {
    return null;
  }
});
const deleteSiteSettingBackup_createServerFn_handler = createServerRpc({
  id: "0a6a8dbc02bf46bfe87e3fdf06d4b0a134afecbb1f851ff16b1714d0fe6f6006",
  name: "deleteSiteSettingBackup",
  filename: "src/server/admin.ts"
}, (opts) => deleteSiteSettingBackup.__executeServer(opts));
const deleteSiteSettingBackup = createServerFn({
  method: "POST"
}).validator((d) => d).handler(deleteSiteSettingBackup_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.siteSettingBackup.delete({
      where: {
        id: data.id
      }
    });
  } catch (e) {
    return null;
  }
});
const getPortfolioItems_createServerFn_handler = createServerRpc({
  id: "3f7ecafd9dcf67e659c689c0ba0749a380a119be88040563d4abf98bb717d9d4",
  name: "getPortfolioItems",
  filename: "src/server/admin.ts"
}, (opts) => getPortfolioItems.__executeServer(opts));
const getPortfolioItems = createServerFn({
  method: "GET"
}).handler(getPortfolioItems_createServerFn_handler, async () => {
  try {
    return await prisma.portfolioItem.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch (e) {
    return [];
  }
});
const getDeletedPortfolioItems_createServerFn_handler = createServerRpc({
  id: "66cc47a1edb47c813b8703817b9a37ec9c4335a876f0aa6ef7934d82b71a7009",
  name: "getDeletedPortfolioItems",
  filename: "src/server/admin.ts"
}, (opts) => getDeletedPortfolioItems.__executeServer(opts));
const getDeletedPortfolioItems = createServerFn({
  method: "GET"
}).handler(getDeletedPortfolioItems_createServerFn_handler, async () => {
  try {
    return await prisma.portfolioItem.findMany({
      where: {
        isDeleted: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch (e) {
    return [];
  }
});
const addPortfolioItem_createServerFn_handler = createServerRpc({
  id: "9291a397fff13402aa32a8a0135d54c778512220661ee053fa0128bce0379a40",
  name: "addPortfolioItem",
  filename: "src/server/admin.ts"
}, (opts) => addPortfolioItem.__executeServer(opts));
const addPortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(addPortfolioItem_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.portfolioItem.create({
      data
    });
  } catch (e) {
    return null;
  }
});
const editPortfolioItem_createServerFn_handler = createServerRpc({
  id: "a8a81ba6cbf2645f174b81c0e1ac4e7982457f8cbf2b2861ddd1377631dbf72e",
  name: "editPortfolioItem",
  filename: "src/server/admin.ts"
}, (opts) => editPortfolioItem.__executeServer(opts));
const editPortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(editPortfolioItem_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    return await prisma.portfolioItem.update({
      where: {
        id
      },
      data: updateData
    });
  } catch (e) {
    return null;
  }
});
const deletePortfolioItem_createServerFn_handler = createServerRpc({
  id: "fe49afd477bab343de452dec5b8a0ca6f55312fdd473bbe5f7e1246b40928fbc",
  name: "deletePortfolioItem",
  filename: "src/server/admin.ts"
}, (opts) => deletePortfolioItem.__executeServer(opts));
const deletePortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(deletePortfolioItem_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.portfolioItem.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: true
      }
    });
  } catch (e) {
    return null;
  }
});
const restorePortfolioItem_createServerFn_handler = createServerRpc({
  id: "7c03329a8c16727df0c810a781a13c5da8db1a89b3ec4523825f0e81ae73755f",
  name: "restorePortfolioItem",
  filename: "src/server/admin.ts"
}, (opts) => restorePortfolioItem.__executeServer(opts));
const restorePortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(restorePortfolioItem_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.portfolioItem.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: false
      }
    });
  } catch (e) {
    return null;
  }
});
const permanentlyDeletePortfolioItem_createServerFn_handler = createServerRpc({
  id: "9a0e3e2cee23d8c4d871b0d176403fc8bf740d046e4b99b99490c3e001dc97f1",
  name: "permanentlyDeletePortfolioItem",
  filename: "src/server/admin.ts"
}, (opts) => permanentlyDeletePortfolioItem.__executeServer(opts));
const permanentlyDeletePortfolioItem = createServerFn({
  method: "POST"
}).validator((d) => d).handler(permanentlyDeletePortfolioItem_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.portfolioItem.delete({
      where: {
        id: data.id
      }
    });
  } catch (e) {
    return null;
  }
});
const getSkills_createServerFn_handler = createServerRpc({
  id: "ead1ef68e17e861fcbdab5c54ea15f6c19a66a9d565057f1a5dd7f7597bb2168",
  name: "getSkills",
  filename: "src/server/admin.ts"
}, (opts) => getSkills.__executeServer(opts));
const getSkills = createServerFn({
  method: "GET"
}).handler(getSkills_createServerFn_handler, async () => {
  try {
    return await prisma.skill.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        name: "asc"
      }
    });
  } catch (e) {
    return [];
  }
});
const getDeletedSkills_createServerFn_handler = createServerRpc({
  id: "a20d9ca9c6ed3baabf19ce59c9a2b479f6e6358ee8eb94cd67eb993098f25dcf",
  name: "getDeletedSkills",
  filename: "src/server/admin.ts"
}, (opts) => getDeletedSkills.__executeServer(opts));
const getDeletedSkills = createServerFn({
  method: "GET"
}).handler(getDeletedSkills_createServerFn_handler, async () => {
  try {
    return await prisma.skill.findMany({
      where: {
        isDeleted: true
      },
      orderBy: {
        name: "asc"
      }
    });
  } catch (e) {
    return [];
  }
});
const addSkill_createServerFn_handler = createServerRpc({
  id: "177b0aec6f2af67aace3a94bb862eecff750cc505cb24fa43a28d155c43131af",
  name: "addSkill",
  filename: "src/server/admin.ts"
}, (opts) => addSkill.__executeServer(opts));
const addSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(addSkill_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.skill.create({
      data
    });
  } catch (e) {
    return null;
  }
});
const editSkill_createServerFn_handler = createServerRpc({
  id: "31106f7674e70b2d4d4195cf025dc6f7eef1c2bdff36e1d10f0fbd785def8c14",
  name: "editSkill",
  filename: "src/server/admin.ts"
}, (opts) => editSkill.__executeServer(opts));
const editSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(editSkill_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    return await prisma.skill.update({
      where: {
        id
      },
      data: updateData
    });
  } catch (e) {
    return null;
  }
});
const deleteSkill_createServerFn_handler = createServerRpc({
  id: "48ba9b7752a964cf0b328038db34b1b9abbcba7692bdcbab8a2efbf34bdf5bab",
  name: "deleteSkill",
  filename: "src/server/admin.ts"
}, (opts) => deleteSkill.__executeServer(opts));
const deleteSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(deleteSkill_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.skill.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: true
      }
    });
  } catch (e) {
    return null;
  }
});
const restoreSkill_createServerFn_handler = createServerRpc({
  id: "9216aa38ef6ddac9b367c73d7efe8c5f66e4c1e0601804c7c436ef82603665ca",
  name: "restoreSkill",
  filename: "src/server/admin.ts"
}, (opts) => restoreSkill.__executeServer(opts));
const restoreSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(restoreSkill_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.skill.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: false
      }
    });
  } catch (e) {
    return null;
  }
});
const permanentlyDeleteSkill_createServerFn_handler = createServerRpc({
  id: "9ee668f85c2c98599d5cb25574b506cd2f8dcee254b6ed628f83dfca9ec526e3",
  name: "permanentlyDeleteSkill",
  filename: "src/server/admin.ts"
}, (opts) => permanentlyDeleteSkill.__executeServer(opts));
const permanentlyDeleteSkill = createServerFn({
  method: "POST"
}).validator((d) => d).handler(permanentlyDeleteSkill_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.skill.delete({
      where: {
        id: data.id
      }
    });
  } catch (e) {
    return null;
  }
});
const getTestimonials_createServerFn_handler = createServerRpc({
  id: "f07a1fc2babd2d4fd842a940ee58484c1114f4f2e3872e9b7a88372d8408db70",
  name: "getTestimonials",
  filename: "src/server/admin.ts"
}, (opts) => getTestimonials.__executeServer(opts));
const getTestimonials = createServerFn({
  method: "GET"
}).handler(getTestimonials_createServerFn_handler, async () => {
  try {
    return await prisma.testimonial.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch (e) {
    return [];
  }
});
const getDeletedTestimonials_createServerFn_handler = createServerRpc({
  id: "cd9c8bf4e859de27f55f2bab3cdae3a6c6e9c16207684acb112593f437410371",
  name: "getDeletedTestimonials",
  filename: "src/server/admin.ts"
}, (opts) => getDeletedTestimonials.__executeServer(opts));
const getDeletedTestimonials = createServerFn({
  method: "GET"
}).handler(getDeletedTestimonials_createServerFn_handler, async () => {
  try {
    return await prisma.testimonial.findMany({
      where: {
        isDeleted: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch (e) {
    return [];
  }
});
const addTestimonial_createServerFn_handler = createServerRpc({
  id: "05d30ce6f7301c0698d671bc5732ee0c9109eb238e13856539b69304ab445210",
  name: "addTestimonial",
  filename: "src/server/admin.ts"
}, (opts) => addTestimonial.__executeServer(opts));
const addTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(addTestimonial_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.testimonial.create({
      data
    });
  } catch (e) {
    return null;
  }
});
const editTestimonial_createServerFn_handler = createServerRpc({
  id: "fe79ca91cee0a002485516401e906d14ca2ffb1c4b15b5b9de5a7b9452326f67",
  name: "editTestimonial",
  filename: "src/server/admin.ts"
}, (opts) => editTestimonial.__executeServer(opts));
const editTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(editTestimonial_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    return await prisma.testimonial.update({
      where: {
        id
      },
      data: updateData
    });
  } catch (e) {
    return null;
  }
});
const deleteTestimonial_createServerFn_handler = createServerRpc({
  id: "a8057bb7b89d73ae4cea6356ef1eed23f2849a1b1764c72653ab6ebabf87d69d",
  name: "deleteTestimonial",
  filename: "src/server/admin.ts"
}, (opts) => deleteTestimonial.__executeServer(opts));
const deleteTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(deleteTestimonial_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.testimonial.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: true
      }
    });
  } catch (e) {
    return null;
  }
});
const restoreTestimonial_createServerFn_handler = createServerRpc({
  id: "d12b8466d64606d6d7ababbe3637abb936287b9eaaeb9a9f3adc5101e687874f",
  name: "restoreTestimonial",
  filename: "src/server/admin.ts"
}, (opts) => restoreTestimonial.__executeServer(opts));
const restoreTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(restoreTestimonial_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.testimonial.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: false
      }
    });
  } catch (e) {
    return null;
  }
});
const permanentlyDeleteTestimonial_createServerFn_handler = createServerRpc({
  id: "5ef1270f0f862d599c48b48d766601f51b5dee55eecf6eadad8febbb5116d667",
  name: "permanentlyDeleteTestimonial",
  filename: "src/server/admin.ts"
}, (opts) => permanentlyDeleteTestimonial.__executeServer(opts));
const permanentlyDeleteTestimonial = createServerFn({
  method: "POST"
}).validator((d) => d).handler(permanentlyDeleteTestimonial_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.testimonial.delete({
      where: {
        id: data.id
      }
    });
  } catch (e) {
    return null;
  }
});
const getGlobalClients_createServerFn_handler = createServerRpc({
  id: "421e4c8d2fba1e8809281497c2a546893046a64d13c0de2acc3dc6147408ff2e",
  name: "getGlobalClients",
  filename: "src/server/admin.ts"
}, (opts) => getGlobalClients.__executeServer(opts));
const getGlobalClients = createServerFn({
  method: "GET"
}).handler(getGlobalClients_createServerFn_handler, async () => {
  try {
    return await prisma.globalClient.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        country: "asc"
      }
    });
  } catch (e) {
    return [];
  }
});
const getDeletedGlobalClients_createServerFn_handler = createServerRpc({
  id: "0117f0ff75c1cf5f6f65865ac3788138ea319143d58cbb90021cfde23b5562dc",
  name: "getDeletedGlobalClients",
  filename: "src/server/admin.ts"
}, (opts) => getDeletedGlobalClients.__executeServer(opts));
const getDeletedGlobalClients = createServerFn({
  method: "GET"
}).handler(getDeletedGlobalClients_createServerFn_handler, async () => {
  try {
    return await prisma.globalClient.findMany({
      where: {
        isDeleted: true
      },
      orderBy: {
        country: "asc"
      }
    });
  } catch (e) {
    return [];
  }
});
const addGlobalClient_createServerFn_handler = createServerRpc({
  id: "1fc56b447b553c352c49592e95dbaa6a38d0173de5e434eb1c15b670d603d16a",
  name: "addGlobalClient",
  filename: "src/server/admin.ts"
}, (opts) => addGlobalClient.__executeServer(opts));
const addGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(addGlobalClient_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.globalClient.create({
      data
    });
  } catch (e) {
    return null;
  }
});
const editGlobalClient_createServerFn_handler = createServerRpc({
  id: "71f8aaaf3175d6c794cd445bfaa04d99fedbf18de9be5fcb250d4d922cf93130",
  name: "editGlobalClient",
  filename: "src/server/admin.ts"
}, (opts) => editGlobalClient.__executeServer(opts));
const editGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(editGlobalClient_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    return await prisma.globalClient.update({
      where: {
        id
      },
      data: updateData
    });
  } catch (e) {
    return null;
  }
});
const deleteGlobalClient_createServerFn_handler = createServerRpc({
  id: "b1f031865733451aaa15f2cd1d04bcd3b5b188c1ed87eb6306f570f558ba32ba",
  name: "deleteGlobalClient",
  filename: "src/server/admin.ts"
}, (opts) => deleteGlobalClient.__executeServer(opts));
const deleteGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(deleteGlobalClient_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.globalClient.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: true
      }
    });
  } catch (e) {
    return null;
  }
});
const restoreGlobalClient_createServerFn_handler = createServerRpc({
  id: "bf530785a4fa1413e9ae3af22b5f35ce538a65b424d617b0bbf1e7ee5d75a15d",
  name: "restoreGlobalClient",
  filename: "src/server/admin.ts"
}, (opts) => restoreGlobalClient.__executeServer(opts));
const restoreGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(restoreGlobalClient_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.globalClient.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: false
      }
    });
  } catch (e) {
    return null;
  }
});
const permanentlyDeleteGlobalClient_createServerFn_handler = createServerRpc({
  id: "763b73e3bd2fcb40192a9b8595cf071ad0c42467851bfaee75b24ebe0f178c16",
  name: "permanentlyDeleteGlobalClient",
  filename: "src/server/admin.ts"
}, (opts) => permanentlyDeleteGlobalClient.__executeServer(opts));
const permanentlyDeleteGlobalClient = createServerFn({
  method: "POST"
}).validator((d) => d).handler(permanentlyDeleteGlobalClient_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.globalClient.delete({
      where: {
        id: data.id
      }
    });
  } catch (e) {
    return null;
  }
});
const getExperiences_createServerFn_handler = createServerRpc({
  id: "c12833a4731b96c255bcb3125210d6bbb006f0660409782ff124bf559ab2e066",
  name: "getExperiences",
  filename: "src/server/admin.ts"
}, (opts) => getExperiences.__executeServer(opts));
const getExperiences = createServerFn({
  method: "GET"
}).handler(getExperiences_createServerFn_handler, async () => {
  try {
    return await prisma.experience.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        createdAt: "asc"
      }
    });
  } catch (e) {
    return [];
  }
});
const getDeletedExperiences_createServerFn_handler = createServerRpc({
  id: "c2a1679b1cdf796a4994dab62848514b7cc9b8ae9d973e08665b2b583859f5a4",
  name: "getDeletedExperiences",
  filename: "src/server/admin.ts"
}, (opts) => getDeletedExperiences.__executeServer(opts));
const getDeletedExperiences = createServerFn({
  method: "GET"
}).handler(getDeletedExperiences_createServerFn_handler, async () => {
  try {
    return await prisma.experience.findMany({
      where: {
        isDeleted: true
      },
      orderBy: {
        createdAt: "asc"
      }
    });
  } catch (e) {
    return [];
  }
});
const addExperience_createServerFn_handler = createServerRpc({
  id: "db71a5c85dec4cecf4ccf4fe2692ce41c2e5523a0295e6f558385cff5df31a42",
  name: "addExperience",
  filename: "src/server/admin.ts"
}, (opts) => addExperience.__executeServer(opts));
const addExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(addExperience_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.experience.create({
      data
    });
  } catch (e) {
    return null;
  }
});
const editExperience_createServerFn_handler = createServerRpc({
  id: "b6ec90da5778d57689e8e624c5052c1fc25a1f1852ca5a2f86dbc90bfb5678d7",
  name: "editExperience",
  filename: "src/server/admin.ts"
}, (opts) => editExperience.__executeServer(opts));
const editExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(editExperience_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    return await prisma.experience.update({
      where: {
        id
      },
      data: updateData
    });
  } catch (e) {
    return null;
  }
});
const deleteExperience_createServerFn_handler = createServerRpc({
  id: "282782d9e9335762449c367b5592aeb72658bd6129992f89354c43aba45e86df",
  name: "deleteExperience",
  filename: "src/server/admin.ts"
}, (opts) => deleteExperience.__executeServer(opts));
const deleteExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(deleteExperience_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.experience.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: true
      }
    });
  } catch (e) {
    return null;
  }
});
const restoreExperience_createServerFn_handler = createServerRpc({
  id: "31a782b6f4b73456daece91f535e35289543bf463b3ec7c7dc9c74a110a5b506",
  name: "restoreExperience",
  filename: "src/server/admin.ts"
}, (opts) => restoreExperience.__executeServer(opts));
const restoreExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(restoreExperience_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.experience.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: false
      }
    });
  } catch (e) {
    return null;
  }
});
const permanentlyDeleteExperience_createServerFn_handler = createServerRpc({
  id: "66504ba07cf249dd262bd1f2a332ec07183bd28e209aec33de285270abc136db",
  name: "permanentlyDeleteExperience",
  filename: "src/server/admin.ts"
}, (opts) => permanentlyDeleteExperience.__executeServer(opts));
const permanentlyDeleteExperience = createServerFn({
  method: "POST"
}).validator((d) => d).handler(permanentlyDeleteExperience_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.experience.delete({
      where: {
        id: data.id
      }
    });
  } catch (e) {
    return null;
  }
});
const getEducations_createServerFn_handler = createServerRpc({
  id: "806baba8dddeefd7415da83c6930e2ae14d5e971e18bd6bbe0c5cedab26e955e",
  name: "getEducations",
  filename: "src/server/admin.ts"
}, (opts) => getEducations.__executeServer(opts));
const getEducations = createServerFn({
  method: "GET"
}).handler(getEducations_createServerFn_handler, async () => {
  try {
    return await prisma.education.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        createdAt: "asc"
      }
    });
  } catch (e) {
    return [];
  }
});
const getDeletedEducations_createServerFn_handler = createServerRpc({
  id: "e640641a475eb37026415599a2a14877f7b868391a517c76a49e2ee55aa7d95c",
  name: "getDeletedEducations",
  filename: "src/server/admin.ts"
}, (opts) => getDeletedEducations.__executeServer(opts));
const getDeletedEducations = createServerFn({
  method: "GET"
}).handler(getDeletedEducations_createServerFn_handler, async () => {
  try {
    return await prisma.education.findMany({
      where: {
        isDeleted: true
      },
      orderBy: {
        createdAt: "asc"
      }
    });
  } catch (e) {
    return [];
  }
});
const addEducation_createServerFn_handler = createServerRpc({
  id: "94d80a4c619704a7a10fdc150c5fe5c2351ef6059b1eeaf31cef1c2227bb4cf7",
  name: "addEducation",
  filename: "src/server/admin.ts"
}, (opts) => addEducation.__executeServer(opts));
const addEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(addEducation_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.education.create({
      data
    });
  } catch (e) {
    return null;
  }
});
const editEducation_createServerFn_handler = createServerRpc({
  id: "6666143a6965f29e53fab0e198383ccafb060272660fe9687f9b8527d25dd74f",
  name: "editEducation",
  filename: "src/server/admin.ts"
}, (opts) => editEducation.__executeServer(opts));
const editEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(editEducation_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    return await prisma.education.update({
      where: {
        id
      },
      data: updateData
    });
  } catch (e) {
    return null;
  }
});
const deleteEducation_createServerFn_handler = createServerRpc({
  id: "0899fb17bec75ab215460ea3b4a46d8642c33f89bc1ea5683518f5c852fa617f",
  name: "deleteEducation",
  filename: "src/server/admin.ts"
}, (opts) => deleteEducation.__executeServer(opts));
const deleteEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(deleteEducation_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.education.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: true
      }
    });
  } catch (e) {
    return null;
  }
});
const restoreEducation_createServerFn_handler = createServerRpc({
  id: "0dfbda04c2a44b95702ae2d131e7745b1a8bebad9630f450ca95f0fb6461d033",
  name: "restoreEducation",
  filename: "src/server/admin.ts"
}, (opts) => restoreEducation.__executeServer(opts));
const restoreEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(restoreEducation_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.education.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: false
      }
    });
  } catch (e) {
    return null;
  }
});
const permanentlyDeleteEducation_createServerFn_handler = createServerRpc({
  id: "0d8decb971d082ecac11514431aa15f3c8cc19666c23882dffb708f591939ab3",
  name: "permanentlyDeleteEducation",
  filename: "src/server/admin.ts"
}, (opts) => permanentlyDeleteEducation.__executeServer(opts));
const permanentlyDeleteEducation = createServerFn({
  method: "POST"
}).validator((d) => d).handler(permanentlyDeleteEducation_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.education.delete({
      where: {
        id: data.id
      }
    });
  } catch (e) {
    return null;
  }
});
const submitMessage_createServerFn_handler = createServerRpc({
  id: "d2ff18a0c4e059bfc52b9b188677cf6e4a466cb639f23ea29f092ae4a7a41141",
  name: "submitMessage",
  filename: "src/server/admin.ts"
}, (opts) => submitMessage.__executeServer(opts));
const submitMessage = createServerFn({
  method: "POST"
}).validator((d) => d).handler(submitMessage_createServerFn_handler, async ({
  data
}) => {
  try {
    const msg = await prisma.message.create({
      data
    });
    console.log(`New message from ${data.name} <${data.email}>: ${data.message}`);
    return msg;
  } catch (e) {
    return null;
  }
});
const getMessages_createServerFn_handler = createServerRpc({
  id: "1408a66fe37b609abed664cc4ba7dcd08854f74efa5d74e54c7e07a3720ee513",
  name: "getMessages",
  filename: "src/server/admin.ts"
}, (opts) => getMessages.__executeServer(opts));
const getMessages = createServerFn({
  method: "GET"
}).handler(getMessages_createServerFn_handler, async () => {
  try {
    return await prisma.message.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch (e) {
    return [];
  }
});
const markMessageRead_createServerFn_handler = createServerRpc({
  id: "66bd5e15db7082ae3ca46be1fd3c24487e5a0c31e5c0a507252af46a400f7b10",
  name: "markMessageRead",
  filename: "src/server/admin.ts"
}, (opts) => markMessageRead.__executeServer(opts));
const markMessageRead = createServerFn({
  method: "POST"
}).validator((d) => d).handler(markMessageRead_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.message.update({
      where: {
        id: data.id
      },
      data: {
        isRead: true
      }
    });
  } catch (e) {
    return null;
  }
});
const replyToMessage_createServerFn_handler = createServerRpc({
  id: "8f5eda357cd21fd7fc5d09989480b9ea04a7a6407af925f6a1cb3cd9fd016e3e",
  name: "replyToMessage",
  filename: "src/server/admin.ts"
}, (opts) => replyToMessage.__executeServer(opts));
const replyToMessage = createServerFn({
  method: "POST"
}).validator((d) => d).handler(replyToMessage_createServerFn_handler, async ({
  data
}) => {
  try {
    const msg = await prisma.message.findUnique({
      where: {
        id: data.id
      }
    });
    if (msg) {
      console.log(`Simulated Email Reply to ${msg.email}:
${data.replyContent}`);
      return await prisma.message.update({
        where: {
          id: data.id
        },
        data: {
          isRead: true
        }
      });
    }
    return null;
  } catch (e) {
    return null;
  }
});
const deleteMessage_createServerFn_handler = createServerRpc({
  id: "896d45017c57c3d6f5b378c07bb0b022061dff88011c46a70cbcdc4c9c41da90",
  name: "deleteMessage",
  filename: "src/server/admin.ts"
}, (opts) => deleteMessage.__executeServer(opts));
const deleteMessage = createServerFn({
  method: "POST"
}).validator((d) => d).handler(deleteMessage_createServerFn_handler, async ({
  data
}) => {
  try {
    return await prisma.message.delete({
      where: {
        id: data.id
      }
    });
  } catch (e) {
    return null;
  }
});
const getDashboardStats_createServerFn_handler = createServerRpc({
  id: "7d29a34d9490fc489083a2204d4438b7d84d0e8e6aaa085d37a25d11cc3a9b28",
  name: "getDashboardStats",
  filename: "src/server/admin.ts"
}, (opts) => getDashboardStats.__executeServer(opts));
const getDashboardStats = createServerFn({
  method: "GET"
}).handler(getDashboardStats_createServerFn_handler, async () => {
  try {
    const totalProjects = await prisma.portfolioItem.count({
      where: {
        isDeleted: false
      }
    });
    const totalSkills = await prisma.skill.count({
      where: {
        isDeleted: false
      }
    });
    const totalMessages = await prisma.message.count();
    const unreadMessages = await prisma.message.count({
      where: {
        isRead: false
      }
    });
    const profileViewsSetting = await prisma.siteSetting.findUnique({
      where: {
        key: "profileViews"
      }
    });
    const profileViews = profileViewsSetting ? parseInt(profileViewsSetting.value) : 0;
    const totalGlobalClients = await prisma.globalClient.count({
      where: {
        isDeleted: false
      }
    });
    return {
      totalProjects,
      totalSkills,
      totalMessages,
      unreadMessages,
      profileViews,
      totalGlobalClients
    };
  } catch (e) {
    return {
      totalProjects: 0,
      totalSkills: 0,
      totalMessages: 0,
      unreadMessages: 0,
      profileViews: 0,
      totalGlobalClients: 0
    };
  }
});
export {
  addEducation_createServerFn_handler,
  addExperience_createServerFn_handler,
  addGlobalClient_createServerFn_handler,
  addPortfolioItem_createServerFn_handler,
  addSkill_createServerFn_handler,
  addTestimonial_createServerFn_handler,
  createSiteSettingBackup_createServerFn_handler,
  deleteEducation_createServerFn_handler,
  deleteExperience_createServerFn_handler,
  deleteGlobalClient_createServerFn_handler,
  deleteMessage_createServerFn_handler,
  deletePortfolioItem_createServerFn_handler,
  deleteSiteSettingBackup_createServerFn_handler,
  deleteSkill_createServerFn_handler,
  deleteTestimonial_createServerFn_handler,
  editEducation_createServerFn_handler,
  editExperience_createServerFn_handler,
  editGlobalClient_createServerFn_handler,
  editPortfolioItem_createServerFn_handler,
  editSkill_createServerFn_handler,
  editTestimonial_createServerFn_handler,
  getDashboardStats_createServerFn_handler,
  getDeletedEducations_createServerFn_handler,
  getDeletedExperiences_createServerFn_handler,
  getDeletedGlobalClients_createServerFn_handler,
  getDeletedPortfolioItems_createServerFn_handler,
  getDeletedSkills_createServerFn_handler,
  getDeletedTestimonials_createServerFn_handler,
  getEducations_createServerFn_handler,
  getExperiences_createServerFn_handler,
  getGlobalClients_createServerFn_handler,
  getMessages_createServerFn_handler,
  getPortfolioItems_createServerFn_handler,
  getSiteSettingBackups_createServerFn_handler,
  getSiteSettings_createServerFn_handler,
  getSkills_createServerFn_handler,
  getTestimonials_createServerFn_handler,
  markMessageRead_createServerFn_handler,
  permanentlyDeleteEducation_createServerFn_handler,
  permanentlyDeleteExperience_createServerFn_handler,
  permanentlyDeleteGlobalClient_createServerFn_handler,
  permanentlyDeletePortfolioItem_createServerFn_handler,
  permanentlyDeleteSkill_createServerFn_handler,
  permanentlyDeleteTestimonial_createServerFn_handler,
  replyToMessage_createServerFn_handler,
  restoreEducation_createServerFn_handler,
  restoreExperience_createServerFn_handler,
  restoreGlobalClient_createServerFn_handler,
  restorePortfolioItem_createServerFn_handler,
  restoreSkill_createServerFn_handler,
  restoreTestimonial_createServerFn_handler,
  submitMessage_createServerFn_handler,
  updateSiteSetting_createServerFn_handler
};
