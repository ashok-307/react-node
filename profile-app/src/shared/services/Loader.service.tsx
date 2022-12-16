import React from 'react';
import { createRoot } from 'react-dom/client';
import Loader from '../components/Loader';

export interface LoaderOptions {
    appendTo?: 'inline' | 'body';
    appendToElement?: string | HTMLElement;
    strokeColor?: string;
    width?: string | number;
    height?: string | number;
    loadingText?: string;
}

export class LoaderService {
    private static keys: (string|number)[] = [];
    private static options: LoaderOptions = {};
    private static defaults: LoaderOptions = {
        appendTo: 'body',
        strokeColor: 'blue',
        width: '150px',
        height: '150px',
        loadingText: 'Loading...'
    };

    private static root = createRoot(
        document.body.querySelector('.loader-panel')!
    );

    private static childRoot: any = null;

    public static openModel(key: string | number, options?: LoaderOptions) {
        this.options = Object.assign({}, this.defaults, options);
        // console.log('OPtions :', this.options);
        if (this.keys.indexOf(key) === -1) {
            this.keys.push(key);
        }
        if (this.options.appendTo === 'inline') {
            let appendToEle = null;
            if (typeof this.options.appendToElement === 'string') {
                appendToEle = document.body.querySelector(this.options.appendToElement);
            } else {
                appendToEle = this.options.appendToElement;
            }
            this.childRoot = createRoot(
                appendToEle!
            );
            this.childRoot.render(<Loader appendTo="inline" />);
            document.body.style.pointerEvents = 'none';
        } else {
            this.root.render(<Loader appendTo="body" loadingText={this.options.loadingText} />);
        }
    }

    public static closeModel(key: string | number) {
        if(this.options.appendTo === 'inline') {
            let ind = this.keys.indexOf(key);
            this.keys.splice(ind, 1);
            
            if (this.childRoot) {
                document.body.style.pointerEvents = 'auto';
                this.childRoot.unmount();
            }
        } else {
            if (this.keys.length === 1) {
                let ind = this.keys.indexOf(key);
                this.keys.splice(ind, 1);
                if (this.root) {
                    this.root.unmount();
                    this.root = createRoot(
                        document.body.querySelector('.loader-panel')!
                    );
                }
            } else {
                let ind = this.keys.indexOf(key);
                this.keys.splice(ind, 1);
            }
        }
    }
}
