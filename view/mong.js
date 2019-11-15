//insert a new real estate property in "residential" document array
db.realestate.update(
  { type: "rental" },
  {
    $push: {
      body: {
        addedon: Date(),
        location: "galveston",
        beds: 100,
        baths: 50,
        price: 2000000,
        images: []
      }
    }
  }
);
//
// new land
//

db.realestate.update(
  { type: "land" },
  {
    $push: {
      body: {
        addedon: Date(),
        location: "richmond",
        acreage: 540,
        price: 2000000,
        images: [
          {
            source: "img/land/two.jpg",
            caption: "nice land in richmond"
          }
        ]
      }
    }
  }
);

//
// init collection
//
db.realestate.insertMany([
  {
    type: "commercial",
    body: [
      {
        addedon: Date(),
        location: "galveston",
        beds: 3,
        bath: 2,
        price: 500000,
        images: [
          {
            source: "img/commercial/one.jpg",
            caption: "nice commercial property in galveston"
          }
        ]
      },
      {
        addedon: Date(),
        location: "Bolivar",
        beds: 2,
        bath: 2,
        price: 600000,
        images: [
          {
            source: "img/commercial/two.jpg",
            caption: "nice commercial property in bolivar"
          }
        ]
      }
    ]
  },
  {
    type: "residential",
    body: [
      {
        addedon: Date(),
        location: "houston",
        beds: 2,
        bath: 1,
        price: 300000,
        images: [
          {
            source: "img/residential/one.jpg",
            caption: "nice residence in houston"
          }
        ]
      }
    ]
  },

  {
    type: "land",
    body: [
      {
        addedon: Date(),
        location: "hearne",
        acreage: 160,
        price: 350000,
        images: [
          {
            source: "img/land/one.jpg",
            caption: "nice land in hearne"
          }
        ]
      }
    ]
  },
  {
    type: "rental",
    body: [
      {
        addedon: Date(),
        location: "austin",
        beds: 1,
        baths: 1,
        rent: 2000,
        basis: "month",
        images: [
          {
            source: "img/rental/one.jpg",
            caption: "nice rental in austin"
          }
        ]
      }
    ]
  }
]);
