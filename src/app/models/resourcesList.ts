import { MoodleResults } from "./moodleResults";
import { MoodleHeadingResults } from "./moodleHedingResults";

export class ResourcesList{
    public resourcesList: MoodleResults[];
    public sectionType: string;
    public newsForum: string;
    public headingDetailList: MoodleHeadingResults[];
}