interface Setting {
    exponentialBackoff: boolean;
    timeout: number;
    tries: number;
    every: number;
}
export interface PublicController {
    abort: Function;
    pause: Function;
    resume: Function;
    ongoing: Function;
}
declare function trytrytry(settings: Setting, fn: Function): PublicController;
export default trytrytry;
