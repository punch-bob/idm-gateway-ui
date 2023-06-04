const lower = new RegExp('(?=.*[a-z])')
const upper = new RegExp('(?=.*[A-Z])')
const number = new RegExp('(?=.*[0-9])')
const special = new RegExp('(?=.*[!@#$%^&*])')
const length = new RegExp('(?=.{8,})')

const handleKey = e => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
        const form = e.target.form
        const index = [...form].indexOf(e.target);
        if (index + 1 < form.length) {
            form[index + 1].focus()
        }
        e.preventDefault()
    }

    if (e.key === "ArrowUp") {
        const form = e.target.form
        const index = [...form].indexOf(e.target)
        if (index - 1 >= 0) {
            form[index - 1].focus()
        }
        e.preventDefault()
    }
}

const validate = (validation, value) => {
    let validationCopy = {...validation}

    if (lower.test(value)) {
        validationCopy = {...validationCopy, lower: true}
    } else {
        validationCopy = {...validationCopy, lower: false}
    }

    if (upper.test(value)) {
        validationCopy = {...validationCopy, upper: true}
    } else {
        validationCopy = {...validationCopy, upper: false}
    }

    if (number.test(value)) {
        validationCopy = {...validationCopy, number: true}
    } else {
        validationCopy = {...validationCopy, number: false}
    }

    if (special.test(value)) {
        validationCopy = {...validationCopy, special: true}
    } else {
        validationCopy = {...validationCopy, special: false}
    }

    if (length.test(value)) {
        validationCopy = {...validationCopy, length: true}
    } else {
        validationCopy = {...validationCopy, length: false}
    }

    return validationCopy
}

const isValid = (value) => {
    if (!lower.test(value)) {
        return false
    }

    if (!upper.test(value)) {
        return false
    } 

    if (!number.test(value)) {
        return false
    }

    if (!special.test(value)) {
        return false
    }

    if (!length.test(value)) {
        return false
    } 
    return true
}

export { handleKey, validate, isValid };