import Post from "./Post.js";
import fileService from "./FileService.js";

class PostService {
    async create(post, picture) {
        const fileName = fileService.saveFile(picture);
        return await Post.create({...post, picture: fileName});
    }

    async getAll() {
        return Post.find();
    }

    async getOne(id) {
        if (!id) throw new Error('No Id');
        return Post.findById(id);
    }

    async update(post) {
        if (!post._id) throw new Error('No Id');
        return Post.findByIdAndUpdate(post._id, post, {new: true});
    }

    async deleteById(id) {
        if (!id) throw new Error('No Id');
        return Post.findByIdAndDelete(id);
    }

}

export default new PostService();
