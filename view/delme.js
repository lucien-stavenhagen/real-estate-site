const data = {
  commercial: [
    {
      location: "",
      beds: 0,
      baths: 0,
      price: 0,
      images: []
    }
  ],
  residential: [
    {
      location: "",
      beds: 0,
      baths: 0,
      price: 0,
      images: []
    }
  ],
  land: [
    {
      location: "",
      acreage: 0,
      price: "",
      images: []
    }
  ],
  rental: [
    {
      location: "",
      beds: 0,
      baths: 0,
      rent: "",
      images: []
    }
  ]
};
const searchkeys = {
  bybnb: {
    beds: "beds",
    baths: "baths",
    hasthem: ["commercial", "residential", "rental"]
  },
  byrent: {
    rent: "rent",
    hasthem: ["rental"]
  },
  byacreage: {
    acreage: "acreage",
    hasthem: ["land"]
  }
};

const showSearchKeys = () => {
  for (let prop in searchkeys) {
    console.log("type of thing:", prop);
    for (let prop1 in searchkeys[prop]) {
      console.log(`\tprops for ${prop}: ${prop1}`);
      console.log(`\t prop value for ${prop}: ${searchkeys[prop][prop1]}\n`);
    }
  }
};
showSearchKeys();
