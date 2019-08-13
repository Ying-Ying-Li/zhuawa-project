/**
 * @field promise
 * @author liyingying
 */

 (function(global) {

    function Promise(processor){
        this.status = 'pending';

        if(!processor) return;

        var _this = this;
        processor(
            function (res){
                _this._resolve(res);
            },
            function (err){
                _this._reject(err);
            }
        )
    }

    Promise.prototype = {
        constructor: Promise,

        taskCallBack(value, processor, next) {
            //console.log(value);
            let result = null;
            let normal = 1
            try {
                result = processor(value);
            } catch (error) {
                result = error;
                normal = 0;
            }

            if (result instanceof Promise) {
                result.next = next;
                result.then(function (res) {
                    next._resolve(res);
                });
                result.catch(function (err) {
                    next._reject(err);
                });
                return;
            }

            if(normal == 1){
                next._resolve(result);
            }else{
                next._reject(result);
            }
            
        },

        then(onFulfilled) {
            //console.log('then:',onFulfilled);
            this.onFulfilled = onFulfilled;
            this.next = new Promise();
            //console.log(this.status);
            if(this.status == 'fulfilled'){
                this.taskCallBack(this.currentValue, this.onFulfilled.bind(this), this.next);
            }
            return this.next;
        },
        catch(onRejected){
            this.onRejected = onRejected;
            this.next = new Promise();
            console.log('status:'+this.status);
            if(this.status == 'rejected'){
                this.taskCallBack(this.currentValue, this.onRejected.bind(this), this.next);
            }
            
        },

        _resolve(res) {
            //console.log('_resolve:'+res);
            this.status = 'fulfilled';
            this.currentValue = res;
            if(this.onFulfilled){
                this.taskCallBack(this.currentValue, this.onFulfilled.bind(this), this.next);
                //this.onFulfilled(this.currentValue);
            }
        },
        _reject(err){
            console.log('_reject:'+err);
            this.status = 'rejected';
            this.currentValue = err;
            if(this.onRejected){
                this.taskCallBack(this.currentValue, this.onRejected.bind(this), this.next);
            }
        }
    }

    global.Promise = Promise;

 })(window)