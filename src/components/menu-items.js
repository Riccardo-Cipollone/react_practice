const menuItems = [
  {
    id: 1,
    label: "Lorem ipsum dolor sit amet",
    children: [],
  },
  {
    id: 2,
    label: "Consectetur adipisicing elit. Accusamus, nobis?",
    children: [],
  },
  {
    id: 3,
    label: "Services",
    children: [
      {
        id: 31,
        label: "Web Development",
        children: [],
      },
      {
        id: 32,
        label: "Data Science",
        children: [],
      },
      {
        id: 33,
        label: "Machine Learning",
        children: [
          {
            id: 331,
            label: "TensorFlow",
            children: [],
          },
          {
            id: 332,
            label: "PyTorch",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Random",
    children: [],
  },
];

export default menuItems;
