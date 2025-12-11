/**
 * Modèle Jeu video - Gestoin des jeux vidéos
 */
import { ObjectId, WithId } from "mongodb";
import { getCollection } from "./mongodb-client";

/**
 * Interface representant un jeu vidéo dans la bd
 */
export interface VideoGame {
  _id?: ObjectId;
  name: string;
  image: string;
}

/**
 * Type pour la creation d'un jeu vidéo
 */
export type CreateVideoGame = Omit<VideoGame, "_id">;

/**
 * Nom de la collection dans la bd mongo
 */
const COLLECTION_NAME = "videoGames";

/**
 * @returns Récupère la collection des jeux vidéos dans des objets de type
 * JeuVideo.
 */
async function getVideoGamesCollection() {
  return getCollection<VideoGame>(COLLECTION_NAME);
}

export async function initializeVideoGameCollection(): Promise<void> {
  await getVideoGamesCollection();
}

/**
 * Crée un nouveau jeu vidéo
 *@param input - les données à inserrer
 */
export async function createJeuVideo(
  input: CreateVideoGame
): Promise<WithId<VideoGame>> {
  const collection = await getVideoGamesCollection();
  const jv: VideoGame = {
    ...input,
    name: input.name,
    image: input.image,
  };
  console.log(jv);
  const result = await collection.insertOne(jv);
  return { ...jv, _id: result.insertedId };
}

export async function findAllVideoGames(): Promise<WithId<VideoGame>[]> {
  const collection = await getVideoGamesCollection();
  return collection.find().toArray();
}
