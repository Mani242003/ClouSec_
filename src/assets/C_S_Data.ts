export interface CaseStudy {
  id: string;
  title: string;
  imgUrl: string;
  challenges1: string;
  // Add other fields as needed
}

const C_S_Data: CaseStudy[] = [
  {
	id: "1",
	title: "Case Study 1",
	imgUrl: "/images/case1.jpg",
	challenges1: "Description of challenges for case study 1...",
  },
  {
	id: "2",
	title: "Case Study 2",
	imgUrl: "/images/case2.jpg",
	challenges1: "Description of challenges for case study 2...",
  },
  {
	id: "3",
	title: "Case Study 3",
	imgUrl: "/images/case3.jpg",
	challenges1: "Description of challenges for case study 3...",
  },
];

export default C_S_Data;