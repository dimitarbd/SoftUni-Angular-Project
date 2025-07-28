const { themeModel } = require('../models');
const { newPost } = require('./postController')

function getParts(req, res, next) {
    partModel.find()
        .populate('userId')
        .then(parts => res.json(parts))
        .catch(next);
}

function getPart(req, res, next) {
    const { partId } = req.params;

    partModel.findById(partId)
        .populate({
            path : 'parts',
            populate : {
              path : 'userId'
            }
          })
        .then(part => res.json(part))
        .catch(next);
}

function getLatestParts(req, res, next) {
    const limit = Number(req.query.limit) || 0;
    partModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('userId')
        .then(parts => res.json(parts))
        .catch(next);
}   

function createPart(req, res, next) {
    const { partName, partText } = req.body;
    const { _id: userId } = req.user;

    partModel.create({ partName, userId, subscribers: [userId] })
        .then(part => {
            newPost(partText, userId, part._id)
                .then(([_, updatedPart]) => res.status(200).json(updatedPart))
        })
        .catch(next);
}

function updatePart(req, res, next) {
    const partId = req.params.partId;
    const { _id: userId } = req.user;
    partModel.findByIdAndUpdate({ _id: partId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedPart => {
            res.status(200).json(updatedPart)
        })
        .catch(next);
}

function deletePart(req, res, next) {
    const { partId } = req.params;
    const { _id: userId } = req.user;

    partModel.findByIdAndDelete({ _id: partId, userId })
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
