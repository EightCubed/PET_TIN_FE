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
  OwnerDetails: {
    FirstName: string;
    LastName: string;
    Age: string;
    Gender: string;
  };
  Location: {
    City: string;
    State: string;
    Country: string;
  };
  ImageArray: string[];
  Species: string;
  Breed: string;
  isLikedByUser: boolean;
  numberOfLikes: number;
  Description: string;
  isDeletable?: boolean;
  isEditable?: boolean;
};
