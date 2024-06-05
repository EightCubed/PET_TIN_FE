export interface PetListDataType extends PetDataType {
  id: string;
}

export interface PetListType {
  data: PetListDataType[];
}

export type PetDataType = {
  petName: string;
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
  imageUrl: string;
  Species: string;
  Breed: string;
};
