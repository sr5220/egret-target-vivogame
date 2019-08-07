//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided this the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

namespace egret.vivogame {

    /**
     * @private
     */
    export class WebTouchHandler extends HashObject {

        /**
         * @private
         */
        public constructor(stage: egret.Stage, canvas: HTMLCanvasElement) {
            super();
            this.touch = new egret.sys.TouchHandler(stage);
            this.addTouchListener();
        }
        /**
         * @private
         */
        private touch: egret.sys.TouchHandler;

        /**
         * @private
         * 
         */
        private addTouchListener(): void {
            let self = this;
            qg.onTouchStart((event) => {
                let l = event.changedTouches.length;
                for (let i: number = 0; i < l; i++) {
                    self.onTouchBegin(event.changedTouches[i]);
                }
            })
            qg.onTouchMove((event) => {
                let l = event.changedTouches.length;
                for (let i: number = 0; i < l; i++) {
                    self.onTouchMove(event.changedTouches[i]);
                }
            })
            qg.onTouchCancel((event) => {
                let l = event.changedTouches.length;
                for (let i: number = 0; i < l; i++) {
                    self.onTouchEnd(event.changedTouches[i]);
                }
            })
            qg.onTouchEnd((event) => {
                let l = event.changedTouches.length;
                for (let i: number = 0; i < l; i++) {
                    self.onTouchEnd(event.changedTouches[i]);
                }
            })
        }

        /**
         * @private
         */
        private prevent(event): void {
            event.stopPropagation();
            // if (event["isScroll"] != true && !this.canvas['userTyping']) {
            //     event.preventDefault();
            // }
        }

        /**
         * @private
         */
        private onTouchBegin = (event: any): void => {
            let location = this.getLocation(event);
            this.touch.onTouchBegin(location.x, location.y, event.identifier);
        }

        /**
         * @private
         */
        private onTouchMove = (event: any): void => {
            let location = this.getLocation(event);
            this.touch.onTouchMove(location.x, location.y, event.identifier);

        }

        /**
         * @private
         */
        private onTouchEnd = (event: any): void => {
            let location = this.getLocation(event);
            this.touch.onTouchEnd(location.x, location.y, event.identifier);
        }

        /**
         * @private
         */
        private getLocation(event: any): Point {
            let x = event.pageX, newx = x;
            let y = event.pageY, newy = y;
            newx = newx / this.scaleX;
            newy = newy / this.scaleY;
            return $TempPoint.setTo(Math.round(newx), Math.round(newy));
        }

        /**
         * @private
         */
        private scaleX: number = 1;
        /**
         * @private
         */
        private scaleY: number = 1;
        /**
         * @private
         */
        private rotation: number = 0;

        /**
         * @private
         * 更新屏幕当前的缩放比例，用于计算准确的点击位置。
         * @param scaleX 水平方向的缩放比例。
         * @param scaleY 垂直方向的缩放比例。
         */
        public updateScaleMode(scaleX: number, scaleY: number, rotation: number): void {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            this.rotation = rotation;
        }

        /**
         * @private
         * 更新同时触摸点的数量
         */
        public $updateMaxTouches(): void {
            if (this.touch.$initMaxTouches) {
                this.touch.$initMaxTouches();
            } else {
                this.touch['$updateMaxTouches']();
            }
        }
    }
}