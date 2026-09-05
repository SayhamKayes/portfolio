import { c as createServerRpc } from "./createServerRpc-B_UnV-kZ.mjs";
import { c as createServerFn, b as getCookie, s as setCookie, d as deleteCookie } from "./server-CCVmfZ8C.mjs";
import { p as prisma } from "./prisma-CNVbm53E.mjs";
import { b as bcrypt } from "../_libs/bcryptjs.mjs";
import { j as jwt } from "../_libs/jsonwebtoken.mjs";
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
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jwa.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/ms.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-do-not-use-in-prod";
const getSessionUser_createServerFn_handler = createServerRpc({
  id: "d2674cc1e673445d163a9608cc5da1fe99c09ebbb6deab822fd424d2b2ef2974",
  name: "getSessionUser",
  filename: "src/server/auth.ts"
}, (opts) => getSessionUser.__executeServer(opts));
const getSessionUser = createServerFn({
  method: "GET"
}).handler(getSessionUser_createServerFn_handler, async () => {
  const token = getCookie("admin_token");
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        emailVerification: true,
        phoneVerification: true,
        appVerification: true
      }
    });
    return user;
  } catch (error) {
    return null;
  }
});
const login_createServerFn_handler = createServerRpc({
  id: "b9add455e4a20c5a8ce7d0fa177795c1edc5cadeccb49800474436b88cd2a97c",
  name: "login",
  filename: "src/server/auth.ts"
}, (opts) => login.__executeServer(opts));
const login = createServerFn({
  method: "POST"
}).validator((data) => data).handler(login_createServerFn_handler, async ({
  data
}) => {
  console.log("Login called with data:", data);
  const {
    username,
    password
  } = data;
  let user = await prisma.user.findUnique({
    where: {
      username
    }
  });
  if (!user) {
    console.log("User not found, checking if we should create default admin");
    const usersCount = await prisma.user.count();
    if (usersCount === 0 && username === "admin" && password === "password123") {
      const hashedPassword = await bcrypt.hash("password123", 10);
      user = await prisma.user.create({
        data: {
          username: "admin",
          password: hashedPassword
        }
      });
      console.log("Default admin created");
    } else {
      return {
        error: "Invalid username or password"
      };
    }
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      error: "Invalid username or password"
    };
  }
  if (user.emailVerification || user.phoneVerification || user.appVerification) {
    return {
      requires2FA: true,
      userId: user.id,
      modes: {
        email: user.emailVerification,
        phone: user.phoneVerification,
        app: user.appVerification
      }
    };
  }
  const token = jwt.sign({
    userId: user.id
  }, JWT_SECRET, {
    expiresIn: "1d"
  });
  setCookie("admin_token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24
    // 1 day
  });
  return {
    success: true
  };
});
const verify2FA_createServerFn_handler = createServerRpc({
  id: "49b03826e96c35b93ae704a9cc2cae2b178112efba2928d19765558d7d385db8",
  name: "verify2FA",
  filename: "src/server/auth.ts"
}, (opts) => verify2FA.__executeServer(opts));
const verify2FA = createServerFn({
  method: "POST"
}).validator((data) => data).handler(verify2FA_createServerFn_handler, async ({
  data
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: data.userId
    }
  });
  if (!user) return {
    error: "User not found"
  };
  if (data.code === "123456") {
    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET, {
      expiresIn: "1d"
    });
    setCookie("admin_token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24
    });
    return {
      success: true
    };
  }
  return {
    error: "Invalid verification code"
  };
});
const logout_createServerFn_handler = createServerRpc({
  id: "58d482668ee4f1bd4655ddc09985d343aa3f4b6ab65073bd9357cdaf12c68656",
  name: "logout",
  filename: "src/server/auth.ts"
}, (opts) => logout.__executeServer(opts));
const logout = createServerFn({
  method: "POST"
}).handler(logout_createServerFn_handler, async () => {
  deleteCookie("admin_token");
  return {
    success: true
  };
});
const getLoginSettings_createServerFn_handler = createServerRpc({
  id: "d6a8d0368fedb2e01db496de441e3fc760e79096836ed5877fe54e945dfabab2",
  name: "getLoginSettings",
  filename: "src/server/auth.ts"
}, (opts) => getLoginSettings.__executeServer(opts));
const getLoginSettings = createServerFn({
  method: "GET"
}).handler(getLoginSettings_createServerFn_handler, async () => {
  const token = getCookie("admin_token");
  if (!token) throw new Error("Not authenticated");
  const decoded = jwt.verify(token, JWT_SECRET);
  return prisma.user.findUnique({
    where: {
      id: decoded.userId
    },
    select: {
      username: true,
      email: true,
      phone: true,
      emailVerification: true,
      phoneVerification: true,
      appVerification: true
    }
  });
});
const updateLoginSettings_createServerFn_handler = createServerRpc({
  id: "00f7ed99f01d1759506aebe6c816df0ad5acccbdb530d79761ddc67c8b05a43c",
  name: "updateLoginSettings",
  filename: "src/server/auth.ts"
}, (opts) => updateLoginSettings.__executeServer(opts));
const updateLoginSettings = createServerFn({
  method: "POST"
}).validator((data) => data).handler(updateLoginSettings_createServerFn_handler, async ({
  data
}) => {
  const token = getCookie("admin_token");
  if (!token) throw new Error("Not authenticated");
  const decoded = jwt.verify(token, JWT_SECRET);
  const updateData = {
    ...data
  };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({
    where: {
      id: decoded.userId
    },
    data: updateData
  });
});
const requestPasswordReset_createServerFn_handler = createServerRpc({
  id: "ce778562da6cf91ff4333f2ad0999439d68aa7d525cae5f62a04debc856461f3",
  name: "requestPasswordReset",
  filename: "src/server/auth.ts"
}, (opts) => requestPasswordReset.__executeServer(opts));
const requestPasswordReset = createServerFn({
  method: "POST"
}).validator((data) => data).handler(requestPasswordReset_createServerFn_handler, async ({
  data
}) => {
  const user = await prisma.user.findUnique({
    where: {
      username: data.username
    }
  });
  if (!user) return {
    success: true
  };
  const token = "RESET_123456";
  console.log(`[PASSWORD RESET] User ${data.username} requested reset. Code: ${token}`);
  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      recoveryToken: token,
      recoveryTokenExpiry: new Date(Date.now() + 15 * 6e4)
      // 15 mins
    }
  });
  return {
    success: true
  };
});
const resetPassword_createServerFn_handler = createServerRpc({
  id: "88ac53f4e4b012227c507f1d46a64097fc5cc4405fcab604a8fb2e78dbe93037",
  name: "resetPassword",
  filename: "src/server/auth.ts"
}, (opts) => resetPassword.__executeServer(opts));
const resetPassword = createServerFn({
  method: "POST"
}).validator((data) => data).handler(resetPassword_createServerFn_handler, async ({
  data
}) => {
  const user = await prisma.user.findUnique({
    where: {
      username: data.username
    }
  });
  if (!user || user.recoveryToken !== data.token || !user.recoveryTokenExpiry || user.recoveryTokenExpiry < /* @__PURE__ */ new Date()) {
    return {
      error: "Invalid or expired reset code"
    };
  }
  const hashedPassword = await bcrypt.hash(data.newPassword, 10);
  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      password: hashedPassword,
      recoveryToken: null,
      recoveryTokenExpiry: null
    }
  });
  return {
    success: true
  };
});
export {
  getLoginSettings_createServerFn_handler,
  getSessionUser_createServerFn_handler,
  login_createServerFn_handler,
  logout_createServerFn_handler,
  requestPasswordReset_createServerFn_handler,
  resetPassword_createServerFn_handler,
  updateLoginSettings_createServerFn_handler,
  verify2FA_createServerFn_handler
};
