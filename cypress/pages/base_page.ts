import { Header } from "./header";
import { PhotoComponent } from "./photo_component";

export class BasePage {
    public header: Header;
    public photoComponent: PhotoComponent;

    constructor() {
        this.header = new Header();
        this.photoComponent = new PhotoComponent();
    } 
    
}