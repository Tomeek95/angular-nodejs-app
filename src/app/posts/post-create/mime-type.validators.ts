import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

//async validator
//[key: string] indicates a dynamic property, we do not care about its name
export const mimeType = (
    control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
    if (typeof control.value === "string") {
        return of(null);
    } // this is just to check if it is a string, and if it is, then it returns an observable,
    //  that ommits data immedeatly
    const file = control.value as File;
    const fileReader = new FileReader();
    //the first parameter is an observer that is granted by rxjs, it is a tool to use to control
    //when it omits data
    //
    const fileReaderObservable = Observable.create((observer: Observer<{ [key: string]: any }>) => {
        //  fileReader.addEventListener("loadend" this is ===== fileReader.onloadend
        fileReader.addEventListener("loadend", () => {
            //this will allow us mine the metadata of the file by following a certain pattern
            //this is necessary since a file's extension can be modified from png to pdf but it will
            //still be a png
            //subarray(0, 4) is a part that contains the mimetype
            const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
            let header = "";
            let isValid = false;
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            switch (header) {
                case "89504e47":
                    isValid = true;
                    break;
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                    isValid = true;
                    break;
                default:
                    isValid = false; // Or you can use the blob.type as fallback
                    break;
            }
            if (isValid) {
                observer.next(null);
            } else {
                observer.next({ invalidMimeType: true });
            }
            observer.complete();
        });

        //this will allow us to access the mimetype
        fileReader.readAsArrayBuffer(file);
    });
    return fileReaderObservable;
};

//load vs loadend --> loadend has more information about the file
