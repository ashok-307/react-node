import React, {forwardRef, FunctionComponent, useImperativeHandle, useRef } from 'react'

const Card:FunctionComponent<any>  = forwardRef((props, ref)=> {
  const ele = useRef<HTMLDivElement>(null);
  const btnClick = () => {
    console.log('hii');
  };


  useImperativeHandle(ref, () => ({
    cardEle: ele.current,
    btnClick
  }));

  return (
    <div className="card-block" ref={ele}>
      <div className="card-header">header</div>
      <div className="card-body">
        <button onClick={btnClick}>Click kme</button>
      </div>
      <div className="card-footer">header</div>
    </div>
  )
})
export default Card;
