
const mongoose = require("mongoose");
// Pass `{algoliaIndex: true}` to push theses attributes for indexing to Algolia
const newIndex = new mongoose.Schema({
  description: { type: String, required: true, algoliaIndex: true },
  prereqs: { type: String, required: true, algoliaIndex: true },
  lecture: {
    type: mongoose.Schema.Types.Mixed, default: "", algoliaIndex: true
  },
  profReview: { 
    type: mongoose.Schema.Types.Mixed, algoliaIndex: true
  },
  notes: {
    type: String, default: "", algoliaIndex: true
  },
  sections: { type: [{}], default: "", algoliaIndex: true },
  courseTitle: { type: String, required: true, algoliaIndex: true },
  courseID: { type: String, required: true, algoliaIndex: true },
  meta: { 
    type: mongoose.Schema.Types.Mixed, algoliaIndex: true
  }
});

module.exports = newIndex;