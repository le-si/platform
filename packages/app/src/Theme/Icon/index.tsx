import { Download } from "lucide-react";

import { AlertCircle } from "./AlertCircle";
import { AlertTriangle } from "./AlertTriangle";
import { Arrow } from "./Arrow";
import { Camera } from "./Camera";
import { Check } from "./Check";
import { ChevronRight } from "./ChevronRight";
import { Clock } from "./Clock";
import { Code } from "./Code";
import { Coin } from "./Coin";
import { Copy } from "./Copy";
import { Engine } from "./Engine";
import { ExternalLink } from "./ExternalLink";
import { Eye } from "./Eye";
import { EyeOff } from "./EyeOff";
import { GridBlocks } from "./GridBlocks";
import { Help } from "./Help";
import { Image } from "./Image";
import { Info } from "./Info";
import { Link } from "./Link";
import { Menu } from "./Menu";
import { Plus } from "./Plus";
import { Python } from "./Python";
import { Search } from "./Search";
import { Spinner } from "./Spinner";
import { Token } from "./Token";
import { TypeScript } from "./TypeScript";
import { Union } from "./Union";
import { Upload } from "./Upload";
import { User } from "./User";
import { X } from "./X";

export type Icon = Styleable & {
  color?: CSSValue;
  onClick?: () => void;
};

export declare namespace Icon {
  export {
    AlertCircle,
    AlertTriangle,
    Arrow,
    Camera,
    Check,
    Code,
    Copy,
    Engine,
    ExternalLink,
    Eye,
    EyeOff,
    GridBlocks,
    Image,
    Info,
    Link,
    Plus,
    Search,
    Spinner,
    Union,
    Upload,
    X,
    Python,
    TypeScript,
    ChevronRight,
    Clock,
    Token,
    Coin,
    Help,
    Menu,
    User,
    Download,
  };
}

export namespace Icon {
  Icon.AlertCircle = AlertCircle;
  Icon.AlertTriangle = AlertTriangle;
  Icon.Arrow = Arrow;
  Icon.Camera = Camera;
  Icon.Check = Check;
  Icon.Code = Copy;
  Icon.Clock = Clock;
  Icon.Copy = Copy;
  Icon.Engine = Engine;
  Icon.ExternalLink = ExternalLink;
  Icon.Eye = Eye;
  Icon.EyeOff = EyeOff;
  Icon.GridBlocks = GridBlocks;
  Icon.Image = Image;
  Icon.Info = Info;
  Icon.Link = Link;
  Icon.Plus = Plus;
  Icon.Search = Search;
  Icon.Spinner = Spinner;
  Icon.Union = Union;
  Icon.Upload = Upload;
  Icon.X = X;
  Icon.Python = Python;
  Icon.TypeScript = TypeScript;
  Icon.ChevronRight = ChevronRight;
  Icon.Token = Token;
  Icon.Coin = Coin;
  Icon.Help = Help;
  Icon.Menu = Menu;
  Icon.User = User;
  Icon.Download = Download;
}
