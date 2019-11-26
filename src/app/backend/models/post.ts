export class Post {

    category: string;
    title: string;
    desc: string;
    body: string;
    image: string;
    docs: string[];


constructor(category: string, title: string, desc: string, body: string) {
this.category = category;
this.title = title;
this.desc = desc;
this.body = body;
}


};