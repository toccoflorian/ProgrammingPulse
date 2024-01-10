
export default function TarifsPage() {


    return (<>

        <h1>Buttons</h1>
        <p>ButtonYesPrimary</p>
        <button className={`ButtonYesPrimary`}>button yes primary</button>

        <p>ButtonYesPrimary</p>
        <button className={`ButtonNoPrimary`}>button no primary</button>

        <p>button</p>
        <button className={`SubmitButton`}>button</button>

        <h1>Inputs</h1>

        <p>InputTextPrimary</p>
        <input type="text" className="inputPrimary" />

        <h1>Titres</h1>
        <h1>H1Primary</h1>
        <h1 className={`H1Primary`}>H1Primary</h1>
        <h1>H1Secondary</h1>
        <h1 className={`H1Secondary`}>H1Secondary</h1>
        <h1>H2Primary</h1>
        <h2 className={`H2Primary`}>H2Primary</h2>
        <h1>H2Secondary</h1>
        <h2 className={`H2Secondary`}>H2Secondary</h2>
        <h1>H3Primary</h1>
        <h3 className={`H3Primary`}>H3Primary</h3>
    </>)
}