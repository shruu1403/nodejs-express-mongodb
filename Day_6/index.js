const mongoose = require("mongoose");
const main = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/cap-library" //cap-library is database name
    );
    console.log("connected to db");
    // await bookModel.insertMany(
    // [
    //   {
    //     title: "harry",
    //     genre: "fantasy",
    //     price: 400,
    //     author: "JK rowling",
    //   },
    //   { title: "ray optics", genre: "thriller", author: "shruti", price: 200 },
    //   { title: "six", genre: "fiction", price: 500, author: "viky" }
    // ])
    const book=new bookModel({
        title:"harry potter",
        author:"JK ROWLING",
        genre:"Fantasy",
        price:500
    })
    await book.save()
    connection.disconnect()
    console.log("connection disconnected");
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
};
main();

//blueprint/structure/schema
const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  price: {type:Number,required:true}
},{
    versionKey:false
});
//model
//book is collection name (ist parameter)
//we need blueprint to create model
const bookModel = mongoose.model("book", bookSchema);
