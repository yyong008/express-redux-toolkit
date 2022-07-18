

let db: any[] = [];

export const addTodo = (req, res) => {
  const body = req.body;
  let item = {
    id: body.id,
    content: body.content,
  };
  db.push(item);
  res.status(200).send(item);
};

export const delTodo = (req, res) => {
  const { id } = req.params;
  db = db.filter((item) => item.id !== id);
  res.status(200).send();
};

export const updateTodo = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  db.forEach((item) => {
    if (item.id === id) {
      item.content = content;
    }
  });
  res.status(200).send();
};

export const getTodo = (req, res) => {
  const { id } = req.params;
  let item = {}
  db.forEach((i) => {
    if (i.id === id) {
      item  = i
    }
  });
  res.status(200).send(item);
};

export const getTodos = (req, res) => {
  res.status(200).json(db);
};