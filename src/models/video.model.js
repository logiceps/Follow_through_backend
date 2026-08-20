 import mongoose , {Schema} from 'mongoose';
 import mongoosePaginate from 'mongoose-paginate-v2';

 const videoSchema = new Schema(
    {
        videoUrl: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true
    }
);

videoSchema.plugin(mongoosePaginate);
 export const Video = mongoose.model('Video', videoSchema);