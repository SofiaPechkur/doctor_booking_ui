type Education = {
  title: string;
  text: string[];
};

export interface DoctorCardProps {
  imgSrc: string;
  extra: string[];
  name: string;
  profession: string;
  education: Education[];
}
