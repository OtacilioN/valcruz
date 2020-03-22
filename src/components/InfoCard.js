import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Interweave from "interweave";
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const InfoCard = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const Link = () => (
    <a target="_blank" rel="noopener noreferrer" href={props.data.whatsapp}>
      <ShareIcon />
    </a>
  );

  return (
    <div key={props.id} className="protocolCard">
      <Card className={classes.root}>
        <CardHeader
          action={
            <span style={{ cursor: "not-allowed" }}>
              <IconButton component={Link} aria-label="share"></IconButton>
            </span>
          }
          title={props.data.title}
          subheader={new Date(
            props.data.date.seconds * 1000
          ).toLocaleDateString("pt-BR")}
        />
        <CardMedia
          className={classes.media}
          image={props.data.image}
          title={props.data.target}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Interweave content={props.data.text} />
            <Typography paragraph>
              <a
                href={props.data.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                Veja a Fonte
              </a>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
export default InfoCard;
