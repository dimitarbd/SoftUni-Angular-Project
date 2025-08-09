const { themeModel, postModel, userModel } = require('../models');

function getParts(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(parts => res.json(parts))
        .catch(next);
}

function getPart(req, res, next) {
    const { partId } = req.params;

    themeModel.findById(partId)
        .populate({
            path: 'posts',
            populate: { path: 'userId' }
        })
        .then(part => res.json(part))
        .catch(next);
}

function getLatestParts(req, res, next) {
    const limit = Number(req.query.limit) || 0;
    themeModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('userId')
        .then(parts => res.json(parts))
        .catch(next);
}   

function createPart(req, res, next) {
    const { partName, partText } = req.body;
    const { _id: userId } = req.user;

    themeModel.create({ themeName: partName, userId, subscribers: [userId] })
        .then(async (part) => {
            if (!partText) {
                const populated = await themeModel.findById(part._id)
                    .populate({ path: 'posts', populate: { path: 'userId' } });
                return res.status(200).json(populated);
            }

            const post = await postModel.create({ text: partText, userId, themeId: part._id });
            await Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { posts: post._id } }),
                themeModel.findByIdAndUpdate(part._id, { $push: { posts: post._id }, $addToSet: { subscribers: userId } })
            ]);

            const updatedPart = await themeModel.findById(part._id)
                .populate({ path: 'posts', populate: { path: 'userId' } });

            return res.status(200).json(updatedPart);
        })
        .catch(next);
}

function updatePart(req, res, next) {
    const partId = req.params.partId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: partId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedPart => {
            res.status(200).json(updatedPart)
        })
        .catch(next);
}

function deletePart(req, res, next) {
    const { partId } = req.params;
    const { _id: userId } = req.user;

    themeModel.findOneAndDelete({ _id: partId, userId })
        .then(deletedPart => res.status(200).json(deletedPart))
        .catch(next);
}

module.exports = {
    getParts,
    getLatestParts,
    createPart,
    getPart,
    updatePart,
}
