

export const Modal=({imgurl,setImgaehover})=>{
    console.log(imgurl)
    return(
        <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" >open modal</button> */}
<dialog id="Custom_modla" className="modal">
  <div className="modal-box bg-slate-900">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle  absolute right-2 top-2" onClick={()=>setImgaehover && setImgaehover(false)}>✕</button>
    </form>
        <img src={imgurl} className="rounded-md" alt="" />
  </div>
</dialog>
        </>
    )
}