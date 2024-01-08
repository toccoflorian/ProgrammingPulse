import { InputFilePrimary } from "../../components/Inputs";
import { ButtonNoPrimary, ButtonYesPrimary } from "../../components/Buttons";

export default function ChangeUserImages(props) {
    return (<>
        <div>
            {props.changeUserImage &&
                <>
                    <InputFilePrimary
                        label={`Choisissez votre image de profil`}
                        id={"userImage"}
                        name={`userImage`}
                        onChange={(e) => { props.setUserImageFile(e.target.files[0]) }}
                    />
                    <div className={`d-flex`}>
                        <ButtonNoPrimary
                            onClick={() => { props.setChangeUserImage(!props.changeUserImage) }}
                            textContent={`Annuler`}
                        />
                        <ButtonYesPrimary
                            onClick={async () => {
                                props.setChangeUserImage(!props.changeUserImage);
                                await props.fetchData.upload(props.userImageFile, "user");
                                document.location.reload();
                            }}
                            textContent={`Valider`}
                        />
                    </div>
                </>
            }

            {props.changeOrganizationImage &&
                <>
                    <InputFilePrimary
                        label={`Choisissez l'image de votre entreprise`}
                        id={"userImage"}
                        name={`userImage`}
                        onChange={(e) => { props.setOrganizationImage(e.target.files[0]) }}
                    />
                    <div className={`d-flex`}>
                        <ButtonNoPrimary
                            onClick={() => { props.setChangeOrganizationImage(!props.changeOrganizationImage) }}
                            textContent={`Annuler`}
                        />
                        <ButtonYesPrimary
                            onClick={async () => {
                                props.setChangeOrganizationImage(!props.changeOrganizationImage);
                                await props.fetchData.upload(props.organizationImageFile, "organization");
                                document.location.reload();
                            }}
                            textContent={`Valider`}
                        />
                    </div>
                </>
            }
        </div>
    </>)
}