export default interface AutoCompleteRef {
    scrollHeight: () => number | undefined,
    focus: () => void,
    setHeight: (height: string) => void
};