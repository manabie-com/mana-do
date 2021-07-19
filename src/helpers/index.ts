interface IClassname {
    [key:string]: Boolean
}

//Define function used to generate classnames for React Component
export const Classnames = (defaultClass: string = '', classes: IClassname ={}  ) => {
    var classArr:Array<string> = [];
    if (defaultClass) classArr.push(defaultClass);
    Object.keys(classes).forEach(element => {
        if (classes[element]) {
            classArr.push(element);
        }
    });
    return classArr.join(' ');
};

export const helpers = {
    validate : (key: string, value: string, password?:string) => {
        if (key === 'username' || key === 'lastname' || key === 'firstnamed' ) {
            if (!value.length) {
                return 'Username is required';
            }
        } 
        else if (key === 'lastname') {
            if (!value.length) {
                return 'Last name is required';
            }
        } 
        else if ( key === 'firstname' ) {
            if (!value.length) {
                return 'First name is required';
            }
        } 
        else if (key === 'password') {
            if (!value.length) {
                return 'Password is required';
            } else if (value.length < 6) {
                return 'As least 6 characters';
            }
        } 
        else if (key === 'password_confirm') {
            if (!value.length) {
                return 'Password is required';
            }
            if (password !== value) {
                return 'Passwor confirm does not match';
            }
        }
        return '';
    }
}