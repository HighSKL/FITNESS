'use client'
import { useRouter } from 'next/navigation';
import { useRouter as useRouters } from 'next/router';

export default class Router {

    private router = useRouter()
    
    public sendUserTo(path: string){
        this.router.push(path)
    }
    public update(){
        this.router.refresh()
    }

}