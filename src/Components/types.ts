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
  Owner: {
    First: string;
    Last: string;
    Age: string;
    Gender: string;
  };
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
};
