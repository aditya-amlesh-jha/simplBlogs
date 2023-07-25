import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = ({handleSubmit,setBody,setTitle,setImage,defaultTitle,defaultBody}) => {
    return (
        <>
        <form onSubmit={handleSubmit}>
                        <div className="col-12">
                            <label className="text-dark">Title<span className="text-danger">*</span></label>
                            <div className="input-group">
                                <input type="text" onChange={(e)=>setTitle(e.target.value)} className="form-control" placeholder="Enter Title" value={defaultTitle} required></input>
                            </div>
                            <div className="mt-3">
                            <label className="text-dark">Thumbnail</label>
                            <div className="input-group mt-2">
                                <input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])} className="form-control" required></input>
                            </div>

                            </div>
                            <label className="text-dark mt-4">Content<span className="text-danger">*</span></label>
                            <div className="editor">
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data = {defaultBody}
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setBody(data);
                                    } }
                                />
                            </div>
                            <button className="btn btn-outline-primary mt-2" type="submit">Submit</button>
                        </div>
                    </form>
        </>
    );
}

Editor.defaultProps = {
    defaultTitle:"",
    defaultBody:""
};

export default Editor;