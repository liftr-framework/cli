
export const checkName = (name: string|boolean) => {
    if (name === true) {
        throw Error('No name given, please provide a name after the command');
    }
};
