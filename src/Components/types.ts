export interface PetListDataType extends PetDataType {
  id: string;
}

export interface PetListType {
  data: PetListDataType[];
}

export type PetDataType = {
  _id: string;
  PetName: string;
  Age: string;
  Gender: string;
  OwnerDetails: string;
  Location: {
    City: string;
    State: string;
    Country: string;
  };
  ImageUrl: string;
  Species: string;
  Breed: string;
  isLikedByUser: boolean;
  numberOfLikes: number;
  Description: string;
};
