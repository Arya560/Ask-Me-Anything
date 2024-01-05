import { body, validationResult, } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const userLoginValidator = [
    body("email")
        .notEmpty()
        .trim()
        .isEmail()
        .withMessage("email is incorrect"),
    body("password")
        .trim()
        .isLength({ min: 6, max: 25 })
        .withMessage("minimum length of password should be between 5-25 characters"),
];
export const userSignupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...userLoginValidator,
];
export const chatCompletionValidator = [
    body("message")
        .notEmpty()
        .withMessage("Message is required"),
];
//# sourceMappingURL=data-validators.js.map