import Api from "../index";

const qs = require("qs");

const create = async (param: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const type = param.type;
  const point = param.point;
  const url = `/api/pointers`;
  return await Api.post(url, {
    data: {
      user: userInfo.id,
      type: type,
      pointer: point,
    },
  });
};

const getRefereeNumber = async () => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const params = {
    filters: {
      user: {
        id: userInfo.id,
      },
      type: "refer_friend",
    },
  };
  const query = qs.stringify(params, {
    encodeValuesOnly: true, // prettify url
  });
  const url = `/api/pointers?${query}`;
  return await Api.get(url);
};

const addPointToReferrer = async (code: string) => {
  const url = `/api/pointers/refer-friend`;
  return await Api.post(url, {
    referralCode: code,
  });
};

const getPointHistory = async () => {
  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const query = qs.stringify(
    {
      filters: {
        user: {
          id: userInfo.id,
        },
      },
      populate: ["biz_listing", "user", "review"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `/api/pointers?${query}`;
  return await Api.get(url);
};

const pointApi = {
  create,
  getRefereeNumber,
  getPointHistory,
  addPointToReferrer,
};

export default pointApi;
