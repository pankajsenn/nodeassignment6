const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    ObjectID :{type:String},
    topic:{type:String , required:true},
    description:{type:String ,required:true},
    posted_at:{type:String ,required:false},
    posted_by: {type:String,required:false}
}
)

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;