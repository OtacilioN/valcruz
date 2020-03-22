import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
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

  const whatsappMsg = props.data.text
    .replace(/<b>/g, "*")
    .replace(/<\/b>/g, "*")
    .replace(/<br \/>/g, "%0D%0A")
    .replace(/<br\/>/g, "%0D%0A");
  const whatsappLink = `whatsapp://send?text=❗ATUALIZAÇÃO ❗ %0D%0A %0D%0A ${whatsappMsg} %0D%0A %0D%0A Para saber mais acesse: %0D%0A https://valcruzapp.github.io/`;

  function formatDate(date) {
    let array = date.split("/");

    let day = array[1];
    if (day.length === 1) {
      day = `0${day}`;
    }

    let month = array[0];
    if (month.length === 1) {
      month = `0${month}`;
    }

    return `${day}/${month}/${array[2]}`;
  }

  return (
    <div key={props.id} className="protocolCard">
      <Card className={classes.root}>
        <CardHeader
          title={props.data.title}
          subheader={formatDate(props.data.date)}
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
          <a
            target="_blank"
            className="whatsapp-link"
            rel="noopener noreferrer"
            href={whatsappLink}
          >
            <WhatsAppIcon /> COMPARTILHAR
          </a>

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
            <br />
            <br />
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
