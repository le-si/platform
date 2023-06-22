import { AlertCircle } from "./AlertCircle";
import { AlertTriangle } from "./AlertTriangle";
import { Arrow } from "./Arrow";
import { Check } from "./Check";
import { Code } from "./Code";
import { Copy } from "./Copy";
import { Engine } from "./Engine";
import { ExternalLink } from "./ExternalLink";
import { Eye } from "./Eye";
import { EyeOff } from "./EyeOff";
import { GridBlocks } from "./GridBlocks";
import { Image } from "./Image";
import { Info } from "./Info";
import { Link } from "./Link";
import { Plus } from "./Plus";
import { Spinner } from "./Spinner";
import { Union } from "./Union";
import { Upload } from "./Upload";
import { X } from "./X";
import { Python } from "./Python";
import { TypeScript } from "./TypeScript";

export type Icon = Styleable & {
  color?: CSSValue;
  onClick?: () => void;
};

export declare namespace Icon {
  export {
    AlertCircle,
    AlertTriangle,
    Arrow,
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
    Spinner,
    Union,
    Upload,
    X,
    Python,
    TypeScript
  };
}

export namespace Icon {
  Icon.AlertCircle = AlertCircle;
  Icon.AlertTriangle = AlertTriangle;
  Icon.Arrow = Arrow;
  Icon.Check = Check;
  Icon.Code = Copy;
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
  Icon.Spinner = Spinner;
  Icon.Union = Union;
  Icon.Upload = Upload;
  Icon.X = X;
  Icon.Python = Python;
  Icon.TypeScript = TypeScript;
}
