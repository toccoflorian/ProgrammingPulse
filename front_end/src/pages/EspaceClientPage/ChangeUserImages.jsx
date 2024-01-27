import PropTypes from "prop-types";
import styles from "./ChangeUserImages.module.scss";

export default function ChangeUserImages(props) {
    console.log("Change image");
    return (<>
        <div className={`${styles.ChangeUserImagesContainer}`}>
            {props.changeUserImage &&
                <div className={`${styles.changeUserProfileImageContainer}`}>
                    <label htmlFor="userImage">Choisissez votre image de profil</label>
                    <input
                        type="file"
                        id={"userImage"}
                        name={`userImage`}
                        onChange={(e) => { props.setUserImageFile(e.target.files[0]) }}
                        className={`inputPrimary`}
                    />
                    <div className={`d-flex`}>
                        <button
                            className={`ButtonNoPrimary`}
                            onClick={() => { props.setChangeUserImage(!props.changeUserImage) }}
                        >
                            Annuler
                        </button>
                        <button
                            className={`ButtonYesPrimary`}
                            onClick={async () => {
                                props.setChangeUserImage(!props.changeUserImage);
                                await props.fetchData.upload(props.userImageFile, "user_image");
                                document.location.reload();
                            }}
                        >Valider</button>
                    </div>
                </div>
            }

            {props.changeOrganizationImage &&
                <>
                    <label htmlFor="userOrganizationImage">Choisissez l&#39;image de votre entreprise</label>
                    <input
                        type="file"
                        label={`Choisissez l'image de votre entreprise`}
                        id={"userOrganizationImage"}
                        name={`userOrganizationImage`}
                        onChange={(e) => { props.setOrganizationImage(e.target.files[0]) }}
                        className={`inputPrimary`}
                    />
                    <div className={`d-flex`}>
                        <button
                            className={`ButtonNoPrimary`}
                            onClick={() => { props.setChangeOrganizationImage(!props.changeOrganizationImage) }}
                        >Annuler</button>
                        <button
                            className={`ButtonYesPrimary`}
                            onClick={async () => {
                                props.setChangeOrganizationImage(!props.changeOrganizationImage);
                                await props.fetchData.upload(props.organizationImageFile, "organization_image");
                                document.location.reload();
                            }}
                        >Valider</button>
                    </div>
                </>
            }
        </div>
    </>)
}

ChangeUserImages.propTypes = {
    changeUserImage: PropTypes.bool,
    changeOrganizationImage: PropTypes.bool,
    setChangeUserImage: PropTypes.func,
    setOrganizationImage: PropTypes.func,
    setUserImageFile: PropTypes.func,
    setChangeOrganizationImage: PropTypes.func,
    userImageFile: PropTypes.any,
    organizationImageFile: PropTypes.any,
    fetchData: PropTypes.object,
}