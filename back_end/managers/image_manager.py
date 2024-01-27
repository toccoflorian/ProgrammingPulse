import os
from PIL import Image
from io import BytesIO
import base64


NB_MAX_OF_IMAGES_BY_PROJECT = 3




def file_exist(file):
    if not os.path.isfile(file):
        return False
    return True





def create_file_path(image_of, id, image_number=False):
    # Définir le chemin du fichier
    file_name = f"{image_of}_{str(id)}.webp"
    if image_number:
        file_name = f'{file_name.split(".")[0]}_{image_number}.webp'
    return f"{os.getcwd()}/back_end/static/images/{image_of}s/{file_name}"






def save_image_to_webp(user_id, image_of, image_data, image_number=False):
    try:
        if not image_data: 
            return {"status": False, "content": "L'image ne contient rien ( image_manager - save_image_to_webp() )."}
        # Créer un objet Image à partir des données de la requête
        image = Image.open(BytesIO(image_data))

        # Redimensionner l'image en conservant le ratio d'aspect
        max_size = 300, 300
        if image_of == "project_image":
            max_size = 800, 600
        if image_of == "project_logo":
            max_size = 600, 400
        image.thumbnail(max_size, Image.Resampling.LANCZOS)

        if image_number:
            image_number = 1
            file_path = create_file_path(image_of, user_id, image_number)

            while file_exist(file_path):
                image_number += 1
                if image_number > NB_MAX_OF_IMAGES_BY_PROJECT:
                    return
                file_path = create_file_path(image_of, user_id, image_number)
        else:
            file_path = create_file_path(image_of, user_id)
        
        print("real path:", os.getcwd())
        print("path:", file_path)

        # Enregistrer l'image au format WebP
        image.save(file_path, format='webp')

        return {"status": True}

    except Exception as e:
        print(e)
        return {"status": False, "content": "Erreur lors de l'enregistrement de l'image ( image_manager - save_image_to_webp() )."}






def convert_to_base64(imagePath):
    with open(os.getcwd() + imagePath, "rb") as image:
        base64_image = base64.b64encode(image.read()).decode()
    # with open("back_end/managers/mails/templates/images/logo_noir.py", "w+") as image64:
    #     image64.write(base64_image)
    return base64_image





# Compter le nombre d'images pour un projet
def count_project_images(project_id):
    count = 0
    for i in range(1, 4):
        if file_exist(create_file_path("project_image", project_id, i)):
            count += 1 
        else:
            return count
    return count
        