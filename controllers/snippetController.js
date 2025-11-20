import Snippet from "../models/Snippet.js";

export const addSnippet = async (req, res) => {
  try {
    const { title, language, tags, description, code } = req.body;

    const newSnippet = await Snippet.create({
      title,
      language,
      tags,
      description,
      code,
      user: req.user._id, // coming from middleware
    });

    res.status(201).json({
      success: true,
      message: "Snippet added successfully!",
      snippet: newSnippet,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// NEW CONTROLLER → Get all snippets
// export const getAllSnippets = async (req, res) => {
//   try {
//     const snippets = await Snippet.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       snippets,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const getAllSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user._id });

    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch snippets" });
  }
};

export const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSnippet = async (req, res) => {
  try {
    const updated = await Snippet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, snippet: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await snippet.deleteOne();

    res.json({ success: true, message: "Snippet deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting snippet" });
  }
};

