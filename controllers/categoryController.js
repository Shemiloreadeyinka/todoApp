const Category = require("../models/categoryModel")


exports.addCategory = async (req, res) => {
    const {id} = req.user
    let { name, description } = req.body
    name = name?.trim().toLowerCase()|| null
    try {
        if (!name) return res.status(400).json({ message: "Name of category required" })
        let category = await Category.findOne({ name})
        if (category) return res.status(400).json({ message: "Category already exists" })
        category = new Category({ name, description, user:id })
        await category.save()
        return res.status(201).json({ message: "category created successfully" })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }


}

exports.getCategory = async (req, res) => {
    let { id } = req.params
    try {
        let category = await Category.findById(id).populate('user', 'name email')
        if (!category) return res.status(404).json({ message: "category doesn't exist" })
        return res.status(200).json({ message: "category retrieved", category })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

exports.getAllCategories = async (req, res) => {
    const { id } = req.user
    try {
        let categories = await Category.find({ user: id }).populate('user', 'username email -_id')
        if (categories.length === 0) return res.status(404).json({ message: "no categories found" })
        return res.status(200).json({ message: "categories retrieved", categories })

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }

}
exports.deleteCategory= async (req,res) => {
    let {id} = req.params

    try {
        const deletedCategory= await Category.findByIdAndDelete(id)
        if (!deletedCategory) return res.status(404).json({message: "category doesn't exist"})
        return res.status(200).json({message: "category successfully deleted", deletedCategory})
    } catch (error) {
                return res.status(500).json({ error: error.message })

    }
    
}

exports.updateCategory = async (req, res) => {
    let { id } = req.params

    let { name, description } = req.body
    newName = name?.trim().toLowerCase()

    try {
        if (!newName && description === undefined) {
            return res.status(400).json({ message: "Please provide new name or description" });
        }
        const category = await Category.findById(id)
        if (!category) return res.status(404).json({ message: "Category doesn't exist" })

        if (newName) {
            const nameExists = await Category.findOne({ name: newName })
                            console.log('patch')

            if (nameExists && nameExists._id.toString() !== category._id.toString()) {
                console.log(nameExists._id.toString(), category._id.toString())
                return res.status(400).json({ message: "Category with this new name already exists" })
            }
            category.name = newName
        }

        if (description !== undefined) category.description = description

        await category.save()
        return res.status(200).json({ message: "Category updated successfully", category })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}