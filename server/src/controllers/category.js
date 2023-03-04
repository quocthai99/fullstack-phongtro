import * as categoryService from "../services/category"

export const category = async(req, res) => {
    try {
        const response = await categoryService.category()
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Category Controller is failed"
        })
    }
} 