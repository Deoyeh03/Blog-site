require('dotenv').config();
const mongoose = require("mongoose");

// Define the Post schema (same as in your models)
const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    createdAt: { type: Date, default: Date.now },
    updatededAt: { type: Date, default: Date.now }
});

const ImportFromRemote = async () => {
    // 1. Connect to remote DB
    const remoteConn = await mongoose.createConnection(process.env.REMOTE_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const RemotePost = remoteConn.model('Post', postSchema);
    console.log(`Connected to remote: ${remoteConn.name}`);

    // 2. Fetch all posts from remote
    const remotePosts = await RemotePost.find({}).lean();
    console.log(`Fetched ${remotePosts.length} posts from remote.`);

    // 3. Connect to local DB (separate connection)
    const localConn = await mongoose.createConnection(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const LocalPost = localConn.model('Post', postSchema);
    console.log(`Connected to local: ${localConn.name}`);

    // 4. Insert into local (optional: clear local collection first)
    await LocalPost.deleteMany({}); // Remove this line if you want to keep existing local data
    await LocalPost.insertMany(remotePosts);
    console.log(`Inserted ${remotePosts.length} posts into local.`);

    // 5. Close connections
    await remoteConn.close();
    await localConn.close();
    console.log('Done!');
};

ImportFromRemote().catch(err => {
    console.error('Error during import:', err);
});

module.exports = ImportFromRemote;
