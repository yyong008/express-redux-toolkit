let data = {
  tip: "test data",
};
export const getNoStore = (req, res) => {
  res.send({
    code: 0,
    data: {
      ...data,
    },
    msg: "success",
  });
};

export const setNoStore = (req, res) => {
  data = {
    ...data,
    ...req.body,
  };
  res.send({
    code: 0,
    data: data,
    msg: "success",
  });
};
